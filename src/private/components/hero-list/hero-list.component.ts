import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../../shared/hero/services/hero.service';
import { Observable, of } from 'rxjs';
import { Hero } from '../../../shared/hero/models/hero.interface';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent implements OnInit {
  heroList$: Observable<Hero[]> = of([]);
  constructor(private heroService: HeroService) { }

  ngOnInit(): void {

    this.heroList$ = this.heroService.getHeroList();
  }

}
