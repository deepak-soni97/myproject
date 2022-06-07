import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgxStarsComponent } from 'ngx-stars';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit {
  @ViewChild(NgxStarsComponent)
  starsComponent: NgxStarsComponent;

  @Input() readonly: boolean = true;
  @Output() rating = new EventEmitter();
  @Input() initialStars: any = 0;

  constructor() {

  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['initialStars']) {
      this.starsComponent?.setRating(this.initialStars);
    }
    // this.fileName=changes['fileName'].currentValue;
    // this.getFilePreviewUrl();
  }
  onRatingSet(e: any) {
    this.rating.emit(e);
  }

}
