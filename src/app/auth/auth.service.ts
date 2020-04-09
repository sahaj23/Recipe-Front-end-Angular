import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { throwError, Subject, BehaviorSubject } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";
export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}
  user = new BehaviorSubject<User>(null);
  token: string = null;
  tokenExpirationTimer: any = null;
  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB2_lCZHehd3Sboz-w7Qe4oZh-hrVCSZt4",
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB2_lCZHehd3Sboz-w7Qe4oZh-hrVCSZt4",
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  autoLogin() {
    const user: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem("userData"));
    if (!user) {
      return;
    }

    const loadedUser = new User(
      user.email,
      user.id,
      user._token,
      new Date(user._tokenExpirationDate)
    );
    if (loadedUser.token) {
      const duration =
        new Date(user._tokenExpirationDate).getTime() - new Date().getTime();
      this.user.next(loadedUser);
      this.autoLogout(duration);
    }
  }
  logout() {
    alert("logout");
    this.user.next(null);
    this.router.navigate(["./auth"]);
    localStorage.removeItem("userData");
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationTime: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationTime);
  }
  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.token = token;
    console.log("token is " + token);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem("userData", JSON.stringify(user));
  }
  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = "An unknown error occurred!";
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = "This email exists already";
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage = "This email does not exist.";
        break;
      case "INVALID_PASSWORD":
        errorMessage = "This password is not correct.";
        break;
    }
    return throwError(errorMessage);
  }
}
