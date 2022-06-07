import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WebConfig } from '@AppConfigs/WebConfig';
import { SharedServiceService, SvcAuthenticationService, SvcUsersService } from '@AppServices';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  pageNames = WebConfig.PagesName;
  constructor(private svcAuth: SvcAuthenticationService, public router: Router,
    private sharedService: SharedServiceService,
    private svcUser: SvcUsersService) {
      this.forgetForm = new FormGroup({
        userName: new FormControl('', [Validators.required]),
      });
     }

  forgetForm: FormGroup;

  ngOnInit(): void {
   
  }

  onSubmit() {

    if (this.forgetForm.valid && this.forgetForm.value.userName != "") {
      this.svcAuth.ForgotPassword(this.forgetForm.value.userName).subscribe(x => {
        Swal.fire({
          title: 'Success',
          text: `Password Reset link shared on email.`,
          icon: 'success',
        }).then((result) => {
          this.router.navigate([WebConfig.PagesName.LoginPage]);
        })
      },(err)=>{
       
        Swal.fire({
          title: 'Error',
          text: `Invalid User Name.`,
          icon: 'error'
        })


      });
    }
  }
}
