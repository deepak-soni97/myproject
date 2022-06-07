import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public name = new BehaviorSubject<string>('kartik')
  loginSuccess: boolean = false;
  responseData: any;
  // sendData$: Observable<any>
  // public allData = new Subject<any>()
  // public name = new Subject<string>()

  constructor(private http:HttpClient, private router:Router){
    // this.sendData$ = this.allData.asObservable();
   }
  getData(){
    let url = "https://angularpro-c612f-default-rtdb.firebaseio.com/users.json";
    return this.http.get(url);
  }
  loginDataHandler(data: any){
    try{
      console.log('login data in service - ',data)
    let url = "http://localhost:4000/login"
      let httpHeaders = new HttpHeaders({
                'Content-Type' : 'application/json',
                'Cache-Control': 'no-cache'
              });
      this.http.post(url, data, {headers: httpHeaders}).subscribe((result) =>{
        localStorage.setItem('userData', JSON.stringify(result))
        console.log('api login result - ' ,result)
        } )
        console.log('auth data is - ',this.responseData)
        // console.log('localstorage data - ', 'userData')
        if(localStorage.length>0){
          this.loginSuccess = true
          this.router.navigate(['/table']);
        }
        else{
          this.loginSuccess = false
        }
    }
    catch(err){
      console.log('login error - ', err)
    }
     
  }
  logoutHandler(){
    localStorage.removeItem('userData')
    this.router.navigate(['']);
  }
  signupHandler(data: any){
    try{
      console.log('sign up data - ', data)
    let url = "http://localhost:4000/registration"
      let httpHeaders = new HttpHeaders({
                'Content-Type' : 'application/json',
                'Cache-Control': 'no-cache'
              });
      this.http.post(url, data, {headers: httpHeaders}).subscribe((result) =>{console.log('registration api data - ', result)})
    }
    catch(err){
      console.log(err);
    }
    
  }
}
