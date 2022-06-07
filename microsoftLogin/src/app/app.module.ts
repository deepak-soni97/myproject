import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MsalModule, MsalService, MSAL_INSTANCE } from '@azure/msal-angular'
import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth:{
      clientId: 'd9980972-47b6-4803-8b12-87b994fccfea',
      redirectUri:'http://localhost:4200'
    }
  })
}

@NgModule({
  declarations: [
    AppComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MsalModule
  ],
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    MsalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
