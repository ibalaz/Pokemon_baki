import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(public http: HttpClient) { }

  getPokemon(): Observable<any> {
    return this.http.get(this.pokemonUrl);
  }

  getPokemonTable(offset: number, limit: number): Observable<any> {
    return this.http.get(this.pokemonUrl + '?offset=' + offset + '&limit=' + limit);
  }

  getPokemonDetails(url: string): Observable<any> {
    return this.http.get(url);
  }
}
