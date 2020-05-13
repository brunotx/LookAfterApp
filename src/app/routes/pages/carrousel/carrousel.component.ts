import { Component, OnInit } from '@angular/core';
import { interval, Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.scss']
})
export class CarrouselComponent implements OnInit {

  public slideIndex;
  public slides;
  public timer = null;
  public count = 0;
  public time$: Subscription;

  constructor() { }

  ngOnInit() {
    this.initGallery();
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
    current.classList.add(moveSlideAnimClass.forCurrent);
    next.classList.add(moveSlideAnimClass.forNext);
  }

  setTimer() {
   this.time$ = interval(2000).subscribe((val) => {
      this.slideIndex++;
      this.moveSlide(this.slideIndex);
    });
  }

  pauseSlider() {
    this.time$.unsubscribe();
  }

  playSlider() {
    this.setTimer();
  }

}