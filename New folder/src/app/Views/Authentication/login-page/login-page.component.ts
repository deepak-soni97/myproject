import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '@AppConfigs/environment';
import { WebConfig } from '@AppConfigs/WebConfig';
import { SharedServiceService, SvcAuthenticationService, SvcUsersService, SvcLocalStorageService } from '@AppServices';
import { EncryptValue, DecryptValue, EncryptApiData } from "@AppUtilities";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  pageNames = WebConfig.PagesName;
  constructor(private svcAuth: SvcAuthenticationService, private svcLocalStorage: SvcLocalStorageService, public router: Router,
    private sharedService: SharedServiceService,
    private svcUser: SvcUsersService) { }
  loginForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl('')
  });

  ngOnInit(): void {

  }

  onSubmit() {

    if (this.loginForm.value.userName != " " && this.loginForm.value.password != " ") {
      let strValue = JSON.stringify({
        Username: this.loginForm.value.userName,
        Password: this.loginForm.value.password,
      })

      const encModel = EncryptApiData(strValue);
      this.svcAuth.AuthenticateUser(encModel).subscribe(x => {
        this.svcLocalStorage.SetData(environment.AuthTokenKeyLSKey, JSON.stringify(x));
        this.router.navigate(['/']);
      },err=>{
        Swal.fire({
          title: 'Error',
          text: `Invalid Credentials.`,
          icon: 'error'
        })
      });
    }
    else {
      Swal.fire({
        title: 'Error',
        text: `Invalid Credentials.`,
        icon: 'error'
      })

    }
  }

}
