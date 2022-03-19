import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeroComponent } from './hero/hero.component';
import { InfoComponent } from './info/info.component';
import { MaterialModule } from './material.module';
import { ArticleListComponent } from './article-list/article-list.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AppRoutingModule } from './app-routing.module';
import { ArticleComponent } from './article/article.component';
import { CommentsComponent } from './comments/comments.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticleListColumnComponent } from './article-list-column/article-list-column.component';
import { HttpClientModule } from '@angular/common/http';
import { AddArticleComponent } from './add-article/add-article.component';
import { TextEditorComponent } from './text-editor/text-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    InfoComponent,
    ArticleListComponent,
    LandingPageComponent,
    ArticleComponent,
    CommentsComponent,
    ArticleListColumnComponent,
    AddArticleComponent,
    TextEditorComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
