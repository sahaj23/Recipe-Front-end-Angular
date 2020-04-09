import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams,
} from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root",
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const modifiedReq = req.clone({
      params: new HttpParams().set("auth", this.authService.token),
    });
    return next.handle(modifiedReq);
  }
}
