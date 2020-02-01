import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';


const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'No Auth'
    })
  };

@Injectable({
  providedIn: 'root'
})
export class HeroService {

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            this.log(`${operation} failed: ${error.message}`);
            return of(result as T)
        };
    }

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };

    private heroesUrl = 'api/heroes';

    private log(message: string) {
        this.MessageService.add(`HeroService: ${message}`);
    }

    getHeroes(): Observable <Hero[]> {
        return this.http.get<Hero[]>(this.heroesUrl).pipe(tap(_ => this.log('fetched heroes')),
                                                                                       catchError(this.handleError<Hero[]>('getHeroes', [])));           
        
    } 

    getHero(id: number): Observable<Hero> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.get<Hero>(url).pipe(
            tap(_ => this.log(`fetched hero id=${id}`)),
            catchError(this.handleError<Hero>(`getHero id=${id}`)));

    } 

    updateHero(hero: Hero): Observable<any> {
        return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe( tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero')));
    }

    addHero(hero: Hero): Observable<Hero> {
        return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions);
    }

    deleteHero(hero: Hero | number): Observable<Hero> {
        const id = typeof hero === 'number' ? hero: hero.id;
        const url = `${this.heroesUrl}/${id}`;
        return this.http.delete<Hero>(url, this.httpOptions);
    }

    searchHeroes(term: string): Observable<Hero[]> {
        if (!term.trim()) {
          // if not search term, return empty hero array.
          return of([]);
        }
        return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
    }

  constructor(private MessageService: MessageService,
                    private http: HttpClient) { }
}
