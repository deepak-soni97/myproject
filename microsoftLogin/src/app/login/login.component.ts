// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormControl, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { UsersService } from '../login.service';

// @Component({
//   selector: 'login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class AuthComponent implements OnInit {

//   hide = true;
//   // userForm: any;
//   responseData: any = []
//   email = new FormControl('', [Validators.required, Validators.email]);
//   userForm: any;
//   loginSuccess = true

//   getErrorMessage() {
//     if (this.email.hasError('required')) {
//       return 'You must enter a value';
//     }

//     return this.email.hasError('email') ? 'Not a valid email' : '';
//   }

//   constructor(private fb:FormBuilder, private router:Router, private http:HttpClient, private user:UsersService ) {
//     this.userForm = this.fb.group({
//       emailid: ['', Validators.required],
//       password: ['' ,Validators.required]
//     })
//    }

//    onSubmit(){
//      this.user.loginDataHandler(this.userForm.value)
//      this.loginSuccess = this.user.loginSuccess
//   }
//   signupHandler(){
//       this.router.navigate(['/sign-up'])
//   }

//   ngOnInit(): void {

//   }

// }
