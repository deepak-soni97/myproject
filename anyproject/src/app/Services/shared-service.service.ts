import { Injectable } from '@angular/core';
import { SvcUsersService } from './svc-users.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  private subject = new Subject<any>();
  private loadInternalPage = new BehaviorSubject<boolean>(false);
  private userProfile = new BehaviorSubject<any>(null);
  private isLoggedOut = new BehaviorSubject<boolean>(true);
  constructor(private svcUser: SvcUsersService) { }


  public get continueChildPageGet(): BehaviorSubject<boolean> {
    return this.loadInternalPage;
  }
  public continueChildPageSet(value: boolean) {
    return this.loadInternalPage.next(value);
  }

  public get isLoggedOutGet(): BehaviorSubject<boolean> {
    return this.isLoggedOut;
  }
  public isLoggedOutSet(value: boolean) {
    return this.isLoggedOut.next(value);
  }


  onClick() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  setUserProfile(userProfileData: any) {

    this.userProfile.next(userProfileData);
  }

  get getUserProfile() : BehaviorSubject<any> {
    return this.userProfile;
  }

  // async getLoggedInUserProfile() {

  //   return .toPromise();
  //   this.setUserProfile(data);
  //   return data;

  // }
}
