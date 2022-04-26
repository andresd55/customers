import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { StorageService } from '../storage/storage.service';
import { catchError, switchMap } from 'rxjs/operators';
import { MsalService } from '@azure/msal-angular';
import { ProfilesService } from '../profile/profiles.service';
import { LoadingService } from '../loading/loading.service';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorsTokenService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Interceptor: ", req.url);
    
    let storageService = this.injector.get(StorageService);
    let authService = this.injector.get(MsalService);
    let profilesService = this.injector.get(ProfilesService);
    let loadingService = this.injector.get(LoadingService);

    loadingService.show();

    let reqToken = req.clone({
      setHeaders: {
        Authorization: `Bearer ${storageService.getUserLocal()}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: {
        ...req.body,
        "businessId": storageService.getProfiles() != null ? storageService.getProfiles().businessId : null,
        "language": storageService.getLanguage() == 'es' ? 'SP' : 'EN'
      }
    });
    
    return next.handle(reqToken).pipe(
      catchError((e: HttpErrorResponse) => {
        if (e.status === 401) {
          storageService.logoutUser();
          /*let scopes = { scopes: [] }
          if (profilesService.validateUserType()) {
            scopes = {
              scopes: ['https://FinotexB2C.onmicrosoft.com/e8529ad6-7364-454a-afac-6c74edc7d5d3/access_as_user']
            }
          } else {
            scopes = {
              scopes: ['api://98c68b8e-0d50-4961-b352-5cd5040b1e1e/access_as_user']
            }
          }
          return authService.acquireTokenSilent(scopes).pipe(
            switchMap(authResponse => {
              storageService.addToken(authResponse.accessToken);
              req = req.clone({
                setHeaders: {
                  authorization: `Bearer ${authResponse.accessToken}`,
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                },
                body: {
                  ...req.body,
                  "businessId": storageService.getProfiles() != null ? storageService.getProfiles().businessId : null,
                  "language": storageService.getLanguage() == 'es' ? 'SP' : 'EN'
                }
              });
              return next.handle(req);
            }),
            catchError((e: HttpErrorResponse) => {
              storageService.logoutUserInterceptor();
              return throwError(e);
            })
          );*/
        }
        return throwError(e);
      }),
      finalize(() => loadingService.hide())
    );
  }

}
