from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
import os
from django.contrib.auth.models import User
from .models import Article, Like, Comment, Profile

def getAuthorization(request, code):
    return JsonResponse(code != 'parola', safe=False)

@csrf_exempt
def login(request):
    data = JSONParser().parse(request)
    user, created = User.objects.get_or_create(
        username=data['username'], first_name=data['token'])
    if (created and not Profile.objects.filter(token=data['token'])):
        user.save()
        profile = Profile.objects.create(
            user=user,
            token=data['token']
        ).save()
    return JsonResponse('Succes', safe=False)


def getArticle(request, id):
    article = Article.objects.filter(id=id)
    if (not article.count()):
        return JsonResponse("404", safe=False)
    article = article[0]
    response = {
        "id": article.id,
        "title": article.title,
        "text": article.text,
        "subtitle": article.subtitle,
        "imageUrl": article.imageUrl,
        "tag" : article.tag
    }
    return JsonResponse(response, safe=False)

@csrf_exempt
def getArticlesList(request, id):
    response = []
    articles = Article.objects.filter(tag__contains = Article.objects.get(id = id).tag if Article.objects.filter(id = id).count() else "").exclude(id = id).order_by("-date")
    for article in articles:    
        response.append({
        "id": article.id,
        "title": article.title,
        "text": article.text,
        "subtitle": article.subtitle,
        "imageUrl": article.imageUrl,
        "tag" : article.tag,
        "likesCount" : Like.objects.filter(article=article.id).count(),
        "commentsCount" : Comment.objects.filter(article=article.id).count()
    })
    return JsonResponse(response, safe=False)

@csrf_exempt
def addArticle(request):
    data = JSONParser().parse(request)
    article = Article.objects.create(
        title = data['title'],
        subtitle = data['subtitle'],
        text = data['text'],
        imageUrl = data['imageUrl'],
        tag = data['tag'].lower()
    )
    article.save()
    return JsonResponse(article.id, safe=False)

@csrf_exempt
def editArticle(request):
    data = JSONParser().parse(request)
    article = Article.objects.get(id = data['id'])
    article.title = data['title']
    article.subtitle = data['subtitle']
    article.text = data['text']
    article.imageUrl = data['imageUrl']
    article.tag = data['tag'].lower()
    article.save()
    return JsonResponse("ok", safe=False)

def deleteArticle(request, id):
    Article.objects.get(id = id).delete()
    return JsonResponse("ok", safe=False)

@csrf_exempt
def getLikesInfo(request):
    data = JSONParser().parse(request)
    articleId = data['articleId']
    userToken = data['token']
    response = {
        'liked' : bool(Like.objects.filter(article = articleId, user = userToken).count()),
        'likesCount' : Like.objects.filter(article = articleId).count()
    }
    return JsonResponse(response, safe=False)

@csrf_exempt
def addLike(request):
    data = JSONParser().parse(request)
    like, created = Like.objects.get_or_create(article=data['articleId'], user=data['token'])
    if (created):
        like.save()
    else:
        like.delete()
    return JsonResponse("ok", safe=False)

def getComments(request, id):
    response = []
    for comment in Comment.objects.filter(article = id).order_by("-date"):
        response.append({
            "id" : comment.id,
            "author" : comment.author,
            "text" : comment.text,
            "imageURL" : comment.imageURL,
        })
    return JsonResponse(response, safe=False)

def checkCommentText(text):
    restrictedWords = ['хохол', 'tigan', 'razboi', 'pula', 'pidar', 'hohol', 'rusofob', 'xenofob', 'jidan', 'nationalist', 'pizda', 'coaie', 'niger', 'nigger', 'rasist', 'discriminare', 'ura', 'nedreptate', 'conflict', 'penis']
    text = text.replace('ț', 't').replace('ș', 's').replace('î', 'i').replace('â', 'a').replace('ă', 'a')
    for word in restrictedWords:
        if word in text.lower():
            return True
    return False

@csrf_exempt
def addComment(request):
    data = JSONParser().parse(request)
    if (checkCommentText(data["text"])):
        return JsonResponse("406", safe=False)
    Comment.objects.create(
        author=data['username'],
        text=data['text'],
        article=data['articleId'],
        imageURL=data['imageURL']
    ).save()
    response = []
    for comment in Comment.objects.filter(article = data['articleId']).order_by("-date"):
        response.append({
            "id" : comment.id,
            "author" : comment.author,
            "text" : comment.text,
            "imageURL" : comment.imageURL,
        })
    return JsonResponse(response, safe=False)
