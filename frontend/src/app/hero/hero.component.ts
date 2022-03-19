import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  constructor() { }

  isDarkTheme: boolean = false
  
  ngOnInit(): void {
    this.isDarkTheme = localStorage.getItem('isDarkTheme') == "dark-theme"
    this.onChangeTheme()
    if (location.hash == "#articole") {
      setTimeout(() => document.getElementsByTagName('app-article-list')[0]!.scrollIntoView(), 10)
    }
  }

  onChangeTheme(){
    let theme = this.isDarkTheme ? "dark-theme" : "light-theme"
    document.body.className = "mat-typography " + theme
    localStorage.setItem('isDarkTheme', this.isDarkTheme ? "dark-theme" : "light-theme")
    this.isDarkTheme = !this.isDarkTheme
  }

  onScroll() {
    document.getElementsByTagName('app-article-list')[0]!.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
  }
}
