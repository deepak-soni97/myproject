import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ChildComponent } from './child/child.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{
  title ='app';

  greet(name:string){
    alert('Hello ' + name);
  }
}

// export class AppComponent implements AfterViewInit {
 
//  userLoggedIn = true;
//  @ViewChild(ChildComponent)
//   childComponentRef!: ChildComponent;

//  ngAfterViewInit(){
//    this.childComponentRef.message='Message from parent component'
//  }
// }
// 