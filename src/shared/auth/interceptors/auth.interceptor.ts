import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse,
} from '@angular/common/http';
import { catchError, map, Observable, of, switchMap, take, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

/**
 * Intercepte les requêtes sortantes (vers le back) et y applique le moyen de s'authentifier auprès du back, si
 * l'utilisateur est considéré "authentifié" par le front.
 *
 * Si l'utililisateur n'est pas authentifié, laisse passer la requête quand même sans le token et écoute si un
 * 401 est retourné.
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private _headerName = 'Authorization';
  private _tokenPrefix = 'TODO'; // à changer selon la méthode d'identification

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {


    return this.authService.getCurrentUser().pipe(
      take(1),
      switchMap((user: any) => {
        if (user) {
          // Les données utilisateur sont présentes : clone la requête en rajoutant le Header Authorization
          const setHeaders: any = {};
          setHeaders[this._headerName] = `${this._tokenPrefix} ${user.token}`;

          const modifiedReq = request.clone({ setHeaders })
          return next.handle(modifiedReq);

        } else {
          // Pas de données utilisateur présentes : retourne la requête et écoute un 401.
          return next.handle(request).pipe(
            catchError((error) => {
              if (error instanceof HttpErrorResponse && error.status === 401) {
                this._handle401Error(error);
              }
              return throwError(error);
            })
          );
        }
      }),
    )
  }

  private _handle401Error(currentError: HttpErrorResponse): void {
    this.router.navigate(['/error/403'], { state: {error: currentError.error} });
  }
}
