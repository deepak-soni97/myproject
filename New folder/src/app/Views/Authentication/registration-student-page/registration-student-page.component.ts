import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '@AppConfigs/environment';
import { WebConfig } from '@AppConfigs/WebConfig';
import { SvcAuthenticationService, SvcLocalStorageService } from '@AppServices';

@Component({
  selector: 'app-registration-student-page',
  templateUrl: './registration-student-page.component.html',
  styleUrls: ['./registration-student-page.component.scss']
})
export class RegistrationStudentPageComponent implements OnInit {
  constructor(private svcAuth: SvcAuthenticationService, private svcLocalStorage: SvcLocalStorageService, public router: Router) { }
  registrationForm = new FormGroup({
    userName: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required])
  });

  ngOnInit(): void {

  }

  onSubmit() {
    debugger
    // TODO: Use EventEmitter with form value
    if (this.registrationForm.valid) {
      this.svcAuth.RegisterStudent(this.registrationForm.value.userName, this.registrationForm.value.password,"PVS").subscribe(x => {
        this.router.navigate([WebConfig.PagesName.LoginPage])
      })
    }
  }
}
