import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit, OnDestroy {

  constructor() { }

  blocks: any = [];
  observer: any;
  imageObserver : any;

  ngOnInit(): void {
    this.imageObserver = new IntersectionObserver((images : any) => {
      images.forEach((image : IntersectionObserverEntry) => {
        image.target.classList.toggle("show-image", image.isIntersecting)
      })
    }, {threshold: .1})
    this.observer = new IntersectionObserver((blocks : any) => {
      blocks.forEach((block : IntersectionObserverEntry) => {
        block.target.classList.toggle("show", block.isIntersecting)
      })
    }, {threshold: .2})
    Array.from(document.getElementsByClassName("block")).forEach(element => {
      this.observer.observe(element)
    });
    Array.from(document.getElementsByClassName("image-block")).forEach(element => {
      this.imageObserver.observe(element)
    });
  }

  ngOnDestroy() {
    this.observer.disconnect()
    this.imageObserver.disconnect()
  }

}
