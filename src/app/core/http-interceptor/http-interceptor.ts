import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

@Injectable({
    providedIn: 'root'
})
export class HTTPLoaderInterceptor implements HttpInterceptor {

    constructor(readonly loadingService: LoadingService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loadingService.openSpinner();
        return next.handle(request)
            .pipe(
                finalize(() => {
                    this.loadingService.closeSpinner();
                })
            );
    }
}