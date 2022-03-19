from django.urls import path
from django.conf.urls import url
from . import views
from django.conf import settings
from django.views.static import serve
from django.conf.urls.static import static

urlpatterns = [
    path('login/', views.login),
    path('getAuthorization/<str:code>', views.getAuthorization),
    path('getArticle/<int:id>', views.getArticle),
    path('getArticlesList/<int:id>', views.getArticlesList),
    path('addArticle/', views.addArticle),
    path('editArticle/', views.editArticle),
    path('deleteArticle/<int:id>', views.deleteArticle),
    path('addLike/', views.addLike),
    path('getLikes/', views.getLikesInfo),
    path('getComments/<int:id>', views.getComments),
    path('addComment/', views.addComment),
    url(r'^media/(?P<path>.*)$', serve,{'document_root': settings.MEDIA_ROOT})
]