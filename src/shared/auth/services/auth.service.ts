import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, take, tap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Ici mon sujet est privé, on appelle la méthode getUserData pour chercher les infos.
  // Le type est "any" pour l'instant (sera changé selon la méthode d'authentification du back)
  private _currentUser$ = new BehaviorSubject<User | null>(null);

  // En dur pour l'instant
  private _endpoint = 'http://localhost:8081/auth'

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  getCurrentUser(): Observable<User | null> {
    return this._currentUser$.asObservable();
  }

  /**
   * Appelle le endpoint du back pour s'authentifier avec login/mot-de-passe.
   *
   * Basic Auth : avec cette méthode, on a juste besoin d'envoyer un header "Authorization" qui contient
   * le mot "Basic " suivi du "login:password" encodé en Base64.
   *
   * L'appel de cette méthode nous permet de "confirmer" avec le back que le login/mdp est correct et nous
   * permet de construire les infos utilisateur pour notre front.
   */
  login(login: string, password: string): Observable<boolean> {
    const params = new HttpParams()
      .set('login', login)
      .set('password', password);

    return this.http.post<User>(
      `${this._endpoint}`,
      { },
      { params }
    ).pipe(
      // traitement de la réponse avant renvoi
      tap((response: User) => this._setUserData(response, login, password)),

      // Convertit en boolean
      map((response) => !!response)
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
   *
   * Basic Auth: se sert du login et mot de passe pour stocker la partie login:mdp utilisée pour construire
   * les headers Authorization.
   *
   * @private
   */
  private _setUserData(response: User | null, login?: string, password?: string) {
    console.log('Response du login: ', response);
    if (!response || !login || !password) {
      this._currentUser$.next(null);
      return;
    }

    const user: User = {
      ...response,
      authData: window.btoa(`${login}:${password}`)
    }

    // Partie qui devra être adaptée en fonction de la réponse renvoyée par le back.
    console.log('next avec ' ,user)
    this._currentUser$.next(user);
  }
}
