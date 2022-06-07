import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WebConfig } from '@AppConfigs/WebConfig';
import { SvcAuthenticationService, SvcLocalStorageService } from '@AppServices';


@Component({
  selector: 'app-registration-teacher-page',
  templateUrl: './registration-teacher-page.component.html',
  styleUrls: ['./registration-teacher-page.component.scss']
})
export class RegistrationTeacherPageComponent implements OnInit {
  constructor(private svcAuth: SvcAuthenticationService, private svcLocalStorage: SvcLocalStorageService, public router: Router) { }
  registrationForm = new FormGroup({
    userName: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required])
  });

  ngOnInit(): void {

  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    if (this.registrationForm.valid) {
      this.svcAuth.RegisterTeacher(this.registrationForm.value.userName, this.registrationForm.value.password, "PVS").subscribe(x => {
        alert("Successfully Register Please login again")
        this.router.navigate(['/', WebConfig.PagesName.LoginPage])
      })
    }
  }
}