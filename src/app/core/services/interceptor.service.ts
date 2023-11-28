import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Interceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem("token");
    console.log('acessou interceptor')
    if(token) {
      req = req.clone({
        setHeaders: {
          Authorization: `${token}`
        }
      })
      console.log('entrou no interceptor')
      return next.handle(req);
    }

    return next.handle(req);
  }   
}
