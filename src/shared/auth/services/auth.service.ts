import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, take, tap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Ici mon sujet est privé, on appelle la méthode getUserData pour chercher les infos.
  // Le type est "any" pour l'instant (sera changé selon la méthode d'authentification du back)
  private _currentUser$ = new BehaviorSubject<any | null>(null);

  // En dur pour l'instant
  private _endpoint = 'http://localhost:8081/auth'

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  getCurrentUser(): Observable<any | null> {
    // Le sujet ne s'arrêtant jamais, on y met un take(1) pour être sûr qu'il se complète.
    return this._currentUser$.asObservable().pipe(take(1));
  }

  /**
   * Appelle le endpoint du back pour s'authentifier avec login/mot-de-passe. L'information du back renvoyée
   * dépendra de celui-ci et de sa méthode pour s'authentifier.
   */
  login(login: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('login', login)
      .set('mdp', password);
    return this.http.post<any>(
      `${this._endpoint}`,
      { }, // format du body à adapter.
      { params }
    ).pipe(
      // traitement de la réponse avant renvoi
      tap((response) => this._setUserData(response))
    );
  }

  /**
   * Se "logout". C'est à dire efface toute info concernant l'authentification actuelle en front et effectue une
   * redirection.
   */
  logout(): Observable<null> {
    this._setUserData(null);
    this.router.navigate(['/']);
    return of(null);
  }

  /**
   * A pour but de sauvegarder dans un sujet / localstorage les infos de l'utilisateur en cas de succès à
   * l'authentification.
   * @param response
   * @private
   */
  private _setUserData(response: any) {
    console.log('Response du login: ', response);
    if (!response) {
      this._currentUser$.next(null);
    }

    // Partie qui devra être adaptée en fonction de la réponse renvoyée par le back.
    this._currentUser$.next(response);
  }
}
