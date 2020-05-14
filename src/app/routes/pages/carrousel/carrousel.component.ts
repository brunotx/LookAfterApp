import { Component, OnInit } from '@angular/core';
import { interval, Subscriber, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PictureModel } from 'src/assets/models/picturesModel';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.scss']
})
export class CarrouselComponent implements OnInit {

  public slideIndex: number;
  public slides: HTMLCollectionOf<any>;
  public count: number = 0;
  public time$: Subscription;
  public pictures1: PictureModel[];
  public pictures: PictureModel[];


  constructor(private httpService: HttpClient) { }

  ngOnInit() {
    this.getPhotos();
  }

  initGallery() {
    this.slideIndex = 0;
    this.slides = document.getElementsByClassName('imageHolder');
    this.slides[this.slideIndex].style.opacity = 1;
    this.moveSlide(this.slideIndex);
    this.setTimer();
  }

  moveSlide(n) {
    this.count++;
    let current;
    let next;
    const moveSlideAnimClass = {
      forCurrent: '',
      forNext: ''
    };

    moveSlideAnimClass.forCurrent = 'moveLeftCurrentSlide';
    moveSlideAnimClass.forNext = 'moveLeftNextSlide';

    if (this.count >= this.slides.length) { this.count = 0; }
    next = this.slides[this.count];

    if (this.count === 1) { this.slideIndex = 0; }
    current = this.slides[this.slideIndex];
    for (let i = 0; i < this.slides.length; i++) {
      this.slides[this.slideIndex].className = 'imageHolder';
      this.slides[this.slideIndex].style.opacity = 0;
    }
    if (current === undefined || next === undefined) { return; }
    current.classList.add(moveSlideAnimClass.forCurrent);
    next.classList.add(moveSlideAnimClass.forNext);
  }

  setTimer() {
    // need Unsubscribe, built OnDestroy
    this.time$ = interval(2000).subscribe((val) => {
      this.slideIndex++;
      this.moveSlide(this.slideIndex);
    });
  }

  pauseSlider() {
    if (this.time$ !== undefined) { this.time$.unsubscribe(); }
  }

  playSlider() {
    this.setTimer();
  }


  getPhotos() {
    // need Unsubscribe, built OnDestroy or change to promise
    this.httpService.get<PictureModel[]>('http://localhost:8080/home', { responseType: 'json' }).subscribe(
      (data) => {
        this.pictures = data;
        this.initGallery();
      }
    );
  }

}
