import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { UserForAuth, UserForLogin } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<UserForAuth | undefined>(undefined);
  private user$ = this.user$$.asObservable();

  user: UserForAuth | undefined;
  USER_KEY = '[user]';

  userSubscription: Subscription;

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) {
    this.userSubscription = this.user$.subscribe((user) => {
      this.user = user;
    });
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  login(formData: UserForLogin) {
    return this.http
      .post<UserForAuth>('/apusers/login', formData)
      .pipe(tap((user) => this.user$$.next(user)));
  }

logout() {
  return this.http
    .post('/logout', {})
    .pipe(tap(() => this.user$$.next(undefined)));
}
}