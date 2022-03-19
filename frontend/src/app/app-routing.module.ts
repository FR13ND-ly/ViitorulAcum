import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddArticleComponent } from './add-article/add-article.component';
import { ArticleComponent } from './article/article.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
    {path: "", component: LandingPageComponent},
    {path: "articol/:id", component: ArticleComponent},
    {path: "articol/:id/edit", component: AddArticleComponent},
    {path: "add-article", component: AddArticleComponent},
    {path: "**", redirectTo: "/"}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }