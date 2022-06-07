import { Component } from '@angular/core';
import { AuthenticationResult } from '@azure/msal-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'microsoft-login';

constructor(private authService: MsalService) { }

ngOnInit() {
  // this.isIframe = window !== window.parent && !window.opener;
}

isLoggedIn() : boolean {
return this.authService.instance.getActiveAccount()!==null
}

login() {
  this.authService.loginPopup()
    .subscribe((response:AuthenticationResult) => {
        console.log(response);
        this.authService.instance.setActiveAccount(response.account);
    });
}

logOut() {
  this.authService.logout();
}
setLoginDisplay() {
  // this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
}

