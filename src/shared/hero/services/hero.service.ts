import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hero } from '../models/hero.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  // En dur pour l'instant
  private _endpoint = 'http://localhost:8081/rest/hero'

  constructor(private http: HttpClient) { }

  getHeroList(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this._endpoint}`);
  }
}
