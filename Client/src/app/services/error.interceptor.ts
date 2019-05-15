import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators'; 

@Injectable()
//The interceptor
export class ErrorInterceptor implements HttpInterceptor {
    //Req httpreuest = gets called before each httprequest
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => {
                //If HttpError = from our api
                if (error instanceof HttpErrorResponse) {
                    //On unauthorized
                    if (error.status === 401){
                        return throwError(error.statusText);
                    }
                    //Remember we defined our error as Application-Error in our API
                    const applicationError = error.headers.get('Application-Error');
                    if (applicationError) {
                        return throwError(applicationError);
                    }
                    //When we send modelStateErrors like BadRequest our API sends the error as an object.
                    //To retrieve the errormessage we're using error.error
                    const serverError = error.error;
                    let modelStateErrors = ''
                    if (serverError.errors && typeof serverError.errors === 'object') {
                        for (const key in serverError.errors) {
                            if (serverError.errors[key]) {
                                modelStateErrors += serverError.errors[key] + '\n';
                            }
                        }
                    } else if (serverError && typeof serverError === 'object') {
                        for (const key in serverError) {
                            if (serverError[key]) {
                                modelStateErrors += serverError[key] + '\n';
                            }
                        }
                    }

                    return throwError(modelStateErrors || serverError || 'Server error');
                }
            })
        ) 
    }
}
//To be able to add our own interceptor to angulars
export const ErrorInterceptorProvider = {
    //Tells its an http interceptor
    provide: HTTP_INTERCEPTORS,
    //Which interceptor (the one created above)
    useClass: ErrorInterceptor,
    //Allow multi = don't override but extend the original angular interceptor
    multi: true
}; 