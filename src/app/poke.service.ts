import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { pokeApi, pokemonParentList } from './pokemon';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeService {

  private URL = "https://pokeapi.co/api/v2/pokemon";
  public $pokeSingle = new BehaviorSubject<pokeApi>(new pokeApi());
  constructor(private http: HttpClient) { }

  getPokeList(): Observable<pokemonParentList>{
    return this.http.get<pokemonParentList>(this.URL);
  }

  getPokemonSingle(pokeName: string): Observable<pokeApi> {// a function to get a string to add to the url so we can get the actual pokemon we want with its different info's.
    return this.http.get<pokeApi>("https://pokeapi.co/api/v2/pokemon/" + pokeName)// uses a http.get to get the information of the certain pokemon in the api.
      .pipe(map(result => { // we use a pipe to combine multiple Rxjs operators to compose asynchronous system (map and get for this instance).
        
        let pokeSingle: pokeApi = new pokeApi(); // making a new instance of pokeApi with a name of pokeSingle(the single pokemon info).
        
        // Assigns all the results from the http get to the variable pokeSingle with its different attributes.
        pokeSingle.id = result.id;
        pokeSingle.base_experience = result.base_experience;
        pokeSingle.name = result.name;
        pokeSingle.types = result.types;
        pokeSingle.weight = result.weight/10;
        pokeSingle.sprites = {
          front_default: result.sprites.front_default
        }
        pokeSingle.height = result.height;
        pokeSingle.abilities = result.abilities;
        pokeSingle.stats = result.stats;

        this.$pokeSingle.next(pokeSingle); // we are feeding the pokeSingle instance value to the observable 

        return pokeSingle; // we return the variable pokeSingle with the different information it has to where it is called.
      }));
  }
}
