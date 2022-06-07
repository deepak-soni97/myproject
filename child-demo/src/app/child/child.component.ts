import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
 
export class ChildComponent implements OnInit {
// export class ChildComponent implements OnChanges {
  
//  @Input('loggedIn') loggedFlag = false;
  //  @Input() loggedIn:boolean | undefined;

  //  private _loggedIn: boolean = false; 
  //  message: string | undefined;
  //  name ='Deepak';
   //create geedIn(): boolean {
//    return ttter function
//    get logghis._loggedIn;
//  }

//  //create setter function
//  @Input()
//  set loggedIn(value: boolean){
//    this._loggedIn = value;
//    if(value === true){
//      this.message = 'Welcome back Deepak';
//    }else {
//      this.message = 'Please log in';
//    }
//  }

  @Output() greetEvent =new EventEmitter();
  name = 'Codevolution';
  constructor() { }

  // ngOnChanges(changes: SimpleChanges): void {
  //     console.log(changes);
  //     const loggedInValue = changes['loggedIn'];
  //     if(loggedInValue.currentValue === true)
  //     {
  //       this.message = 'Welcome back Deepak!';
  //     } else {
  //       this.message = 'Please log in';
  //     }
  // }
 
  //  greetDeepak(){
  //    alert('Hey Deepak!');
  //  }

   ngOnInit(){

   }

   callParentGreet(){
this.greetEvent.emit(this.name);
   }
}

