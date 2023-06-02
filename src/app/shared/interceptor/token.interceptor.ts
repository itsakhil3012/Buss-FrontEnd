import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeneralService } from '../service/general.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private general: GeneralService,
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.headers.get('Skip')) {
      const newHeaders = request.headers.delete('Skip')
      const newRequest = request.clone({ headers: newHeaders });
      return next.handle(newRequest);
    }
    else if (this.general.getToken) {
      request = request.clone({
        setHeaders: {
          Authorization: this.general.getToken
        }
      });
      return next.handle(request);
    } else {
      return next.handle(request);
    }
  }

}