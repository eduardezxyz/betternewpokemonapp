import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { pokemonParentList } from './pokemon';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeService {

  private URL = "https://pokeapi.co/api/v2/pokemon";
  constructor(private http: HttpClient) { }

  getPokeList(): Observable<pokemonParentList>{
    return this.http.get<pokemonParentList>(this.URL);
  }
}
