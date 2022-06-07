import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WebConfig } from '@AppConfigs/WebConfig';
import { ConfirmedValidator } from '@AppPages/change-password/confirmVal';
import { SharedServiceService, SvcAuthenticationService, SvcUsersService } from '@AppServices';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  pageNames = WebConfig.PagesName;
  form: FormGroup = new FormGroup({});
  code: string = "";
  constructor(private fb: FormBuilder, private svcAuth: SvcAuthenticationService, public router: Router,
    private sharedService: SharedServiceService, private route: ActivatedRoute,
    private svcUser: SvcUsersService) {

    this.route.params.subscribe(routeParams => {
      this.code = this.route.snapshot.queryParamMap.get('code') || '';
      if (this.code) {
        this.form = fb.group({
          password: ['', [Validators.required]],
          confirm_password: ['', [Validators.required]]
        }, {
          validator: ConfirmedValidator('password', 'confirm_password')
        })

      } else {
        this.router.navigate([WebConfig.PagesName.LoginPage]);
      }
    })

  }



  ngOnInit(): void {

  }
  get f() {
    return this.form.controls;
  }
  onSubmit() {
    console.log(this.form.errors, this.form.value)
    if (this.form.valid) {
      this.svcAuth.ResetPassword(this.form.value.password, this.code).subscribe(x => {
        Swal.fire({
          title: 'Success',
          text: `Password changed successfully.`,
          icon: 'success',
        }).then((result) => {
          this.router.navigate([WebConfig.PagesName.LoginPage]);
        })
      }, (err) => {

        Swal.fire({
          title: 'Error',
          text: `Error occured.`,
          icon: 'error'
        })


      });
    }
  }
}
