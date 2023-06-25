import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastr:ToastrService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(

      catchError((error:HttpErrorResponse)=> {
        this.toastr.error(error.error.message);

        if(error.error.message == "jwt expired" || error.error.message == "jwt must provided" || error.error.message == "jwt malformed") {
          this.router.navigate(['/auth/login']);
          localStorage.removeItem('token');
        }
        throw error
      })
    );
  }
}
