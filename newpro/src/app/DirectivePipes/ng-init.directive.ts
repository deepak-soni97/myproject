import { Directive, EventEmitter, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[ngInit]',
  exportAs: 'ngInit'
})
export class NgInit implements OnInit {
  @Output()
  ngInit: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.ngInit.emit();
  }
}
