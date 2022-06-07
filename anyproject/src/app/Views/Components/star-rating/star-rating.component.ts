import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit {

  @Input() readonly: boolean = true;
  @Output() rating = new EventEmitter();
  @Input() initialStars:any=0;

  constructor() { 

  }
  
  ngOnInit(): void {
  
  }

  onRatingSet(e:any){
    this.rating.emit(e);
  }

}
