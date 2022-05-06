import { Component, OnDestroy, OnInit } from '@angular/core';
import { min, Subject } from 'rxjs';
import { PokeService } from '../poke.service';
import { pokeApi } from '../pokemon';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit, OnDestroy {

  constructor(private pokeService: PokeService,
    private route: ActivatedRoute,
    private router: Router,
  ) { } // need this constructor to subsribe to the getPokemonSingle observable in the ngOnInit function

  pokeSingle: pokeApi = new pokeApi(); // new variable to be used in getPokemonSingle from the instance of pokeApi
  pokeMoves: string[] = [];
  fourMoves: string[] = [];
  pokeNameUrl: any;
  pokeType: string = '';
  pokeAbilities: string = '';
  pokeId: string = '';
  pokeStats: string = '';
  pokeStatsNum: number = 0;
  isVisibleMore: boolean = false;
  maxItems: number = 4;
  bgcolor: string = 'green';
  styles: any;

  ngOnInit(): void {
    this.getPokemonSingle();// calls on the function in the file
  }

  // a function to subscribe to the observable in the service file.
  getPokemonSingle(): void {
    this.pokeNameUrl = this.route.snapshot.paramMap.get('name');

    this.pokeService.getPokemonSingle(this.pokeNameUrl).subscribe(pokeSingle$ => {

      // Stores the single pokemon in variable pokeSingle
      this.pokeSingle = pokeSingle$;

      // Stores the pokemon Id in a single variable
      this.pokeId = this.pokeSingle.id + "";

      // Determines if the pokemon only has 1 or 2 types and stores it to a variable for better formatting
      if (this.pokeSingle.types.length == 1) {
        this.pokeType = this.pokeSingle.types[0].type.name;
      }
      else {
        this.pokeType = this.pokeSingle.types[0].type.name;
        this.pokeType = this.pokeType + " | " + this.pokeSingle.types[1].type.name;
      }

      // Determines to see how many abilities a pokemon can possibly have
      if (this.pokeSingle.abilities.length == 1) {
        this.pokeAbilities = this.pokeSingle.abilities[0].ability.name;
      }
      else {
        for (let i = 0; i < this.pokeSingle.abilities.length; i++)
          if (this.pokeAbilities.length == 0)
            this.pokeAbilities = this.pokeSingle.abilities[i].ability.name;
          else
            this.pokeAbilities = this.pokeAbilities + " | " + this.pokeSingle.abilities[i].ability.name;
      }

      // if statement for better formatting
      if (this.pokeId.length == 1) {
        this.pokeId = "00" + this.pokeId;
      }
      else if (this.pokeId.length == 2) {
        this.pokeId = "0" + this.pokeId;
      }

      // Stores all the possible moves that a pokemon can have in an array.
      for (let i = 0; i < this.pokeSingle.moves.length; i++) {
        this.pokeMoves[i] = this.pokeSingle.moves[i].move.name;
      }

    }, (error) => { // send an error if the pokemon name isnt in the database and takes you back to the pokedex component
      this.router.navigate(['/pokedex']);
      console.log('An unexpected error occured');
      console.log(error);
    }); // Subscribe to the getPokemonSingle observable in our poke.service file); // Subscribe to the getPokemonSingle observable in our poke.service file
  }

  // function to limit the amount of moves a pokemon has
  onValueChanged(e: any) {
    if (e.value.length > this.maxItems) {
      let newValue = e.value.slice(0, this.maxItems);
      e.component.option("value", newValue);
      this.isVisibleMore = true;
    }
  }

  // creating a subject called onDestroy to use in the ngOnDestroy function
  onDestroy$: Subject<void> = new Subject<void>();

  // A destroy function to basically unsubscribe to a certain observable.
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
