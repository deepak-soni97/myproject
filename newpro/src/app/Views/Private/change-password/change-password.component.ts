
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SvcAuthenticationService, SvcUsersService } from '@AppServices';

import Swal from 'sweetalert2';
import { ConfirmedValidator } from './confirmVal';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  ngOnInit(): void {

  }

form: FormGroup = new FormGroup({});
  
  constructor(private fb: FormBuilder ,
        private svcUser: SvcUsersService,private svcAuth: SvcAuthenticationService) {
  
    this.form = fb.group({
      oldPassword: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]]
    }, { 
      validator: ConfirmedValidator('password', 'confirm_password')
    })
  }
    
  get f(){
    return this.form.controls;
  }
   
  submit(){
    if(this.form.valid){
      this.svcUser.ChangePassword(this.form.value.oldPassword,this.form.value.password).subscribe(row=>{

      Swal.fire({
          title: 'Success',
          text: `Password Changed successfully. Please login again`,
          icon: 'success',
        }).then((result) => {
          this.svcAuth.Logout();
        })
      }, (err) => {

        Swal.fire({
          title: 'Error',
          text: `Invalid Old Password.`,
          icon: 'error'
        })


      });

    }
  }
   
}
