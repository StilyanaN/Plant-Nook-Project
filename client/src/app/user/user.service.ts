import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { User, UserForAuth } from '../types/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<User| undefined>(undefined);
  private user$ = this.user$$.asObservable();

  user: User | undefined;
  USER_KEY = '[user]';

  userSubscription: Subscription;

  get isLogged(): boolean {
    return !!this.user;
  };

  get currentUsername(): string | undefined {
    return this.user ? this.user.username : undefined;
  };

  get currentUserId(): string | undefined {
    return this.user ? this.user._id : undefined;
  };

  constructor(private http: HttpClient) {
    this.userSubscription = this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  login(email: string, password: string) {
    const { apiUrl } = environment;
    return this.http
      .post<User>(
        `${apiUrl}/login`,
        { email, password },
        { withCredentials: true }
      )
      .pipe(
        tap((user) => {
          this.user$$.next(user);
        
        })
      );
  }

  register(
    username: string,
    email: string,
    gender:string,
    password: string,
    rePassword: string
  ) {
    const { apiUrl } = environment;
    return this.http
      .post<User>(
        `${apiUrl}/register`,
        {
          username,
          email,
          gender,
          password,
          rePassword,
        },
        { withCredentials: true }
      )
      .pipe(
        tap((user) => {
          this.user$$.next(user);
          
        })
      );
  }

  logout() {
    const { apiUrl } = environment;
    return this.http.post(`${apiUrl}/logout`, {},{ withCredentials: true }).pipe(
      tap(() => this.user$$.next(undefined)));
  }

  getProfile() {
    const { apiUrl } = environment;
    return this.http
    .get<User>(`${apiUrl}/users/profile`,{ withCredentials: true }).pipe(tap(user => {
      if (user) {
        this.user$$.next(user);
      } else {
        this.user$$.next(undefined);
      }
    }));
  }
  getProfileId(userId: string) {
    const { apiUrl } = environment;
    return this.http
      .get<User>(`${apiUrl}/users/profile/${userId}`, { withCredentials: true })
      .pipe(tap((user) => this.user$$.next(user)));
  }
  

  updateProfile(username: string, email: string, ) {
    const { apiUrl } = environment;
    return this.http
      .put<User>(`${apiUrl}/users/profile`, {
        username,
        email,
      },{ withCredentials: true })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
