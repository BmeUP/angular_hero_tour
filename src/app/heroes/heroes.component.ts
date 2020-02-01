import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import {HEROES} from '../mock-heroes';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
    
    heroes : Hero[];
    selectedHero: Hero;


  constructor(private HeroService: HeroService) { }

  ngOnInit() {
      this.getHeroes();
  }

  onSelect(heroo: Hero): void{
      this.selectedHero = heroo;
  }

  getHeroes(): void {
    this.HeroService.getHeroes().subscribe(heroes => this.heroes = heroes );
  }

  add(name: string) {
      name = name.trim();
      if (!name) {return;}
      this.HeroService.addHero({name} as Hero).subscribe(hero => {this.heroes.push(hero)});
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.HeroService.deleteHero(hero).subscribe();
  }

}
