import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { PokeService } from '../poke.service';
import { Moves, pokeApi } from '../pokemon';
import { ActivatedRoute, Router } from '@angular/router';
import { DxButtonModule } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { DxTagBoxModule, DxTemplateModule } from 'devextreme-angular';

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
  pokeNameUrl: any;
  pokeType2: string = '';
  pokeAbilities: string = '';
  counter: number = 0;
  pokeId: string = '';
  pokeStats: string = '';
  pokeStatsNum: number = 0;
  capitalize = (text: any) => text.charAt(0).toUpperCase() + text.slice(1);
  simpleProducts: string[] = [];
  editableProducts: string[] = [];
  dataSource: any;

  ngOnInit(): void {
    this.getPokemonSingle();// calls on the function in the file
  }

  click = (e: any) => {
    const buttonText = e.component.option('text');
    notify(`The ${this.capitalize(buttonText)} button was clicked`);
  };


  // a function to subscribe to the observable in the service file.
  getPokemonSingle(): void {
    this.pokeNameUrl = this.route.snapshot.paramMap.get('name');
    // this.pokeService.$pokeSingle.subscribe(pokeSingle$ => {
    this.pokeService.getPokemonSingle(this.pokeNameUrl).subscribe(pokeSingle$ => {
      this.pokeSingle = pokeSingle$;
      // this.pokeMoves = this.pokeSingle.moves;
      this.pokeId = this.pokeSingle.id + "";
      if (this.pokeSingle.types.length == 1) {
        this.pokeType2 = this.pokeSingle.types[0].type.name;
      }
      else {
        this.pokeType2 = this.pokeSingle.types[0].type.name;
        this.pokeType2 = this.pokeType2 + " | " + this.pokeSingle.types[1].type.name;
      }

      if (this.pokeSingle.abilities.length == 1) {
        this.pokeAbilities = this.pokeSingle.abilities[0].ability.name;
      }
      else {
        for (this.counter; this.counter < this.pokeSingle.abilities.length; this.counter++)
          if (this.pokeAbilities.length == 0)
            this.pokeAbilities = this.pokeSingle.abilities[this.counter].ability.name;
          else
            this.pokeAbilities = this.pokeAbilities + " | " + this.pokeSingle.abilities[this.counter].ability.name;
        this.counter = 0;
      }

      if (this.pokeId.length == 1) {
        this.pokeId = "00" + this.pokeId;
      }
      else if (this.pokeId.length == 2) {
        this.pokeId = "0" + this.pokeId;
      }

      for (let i = 0; i < this.pokeSingle.moves.length; i++){
        this.pokeMoves[i] = this.pokeSingle.moves[i].move.name;
      }
      // console.log(this.pokeMoves);
    }, (error) => { // send an error if the pokemon name isnt in the database and takes you back to the pokedex component
      this.router.navigate(['/pokedex']);
      console.log('An unexpected error occured');
      console.log(error);
    }); // Subscribe to the getPokemonSingle observable in our poke.service file); // Subscribe to the getPokemonSingle observable in our poke.service file
  }

  // creating a subject called onDestroy to use in the ngOnDestroy function
  onDestroy$: Subject<void> = new Subject<void>();

  // A destroy function to basically unsubscribe to a certain observable.
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  pokeName = "Squirtle";
  pokeSmolDesc = "(Tiny Turtle Pokemon)"
  pokeNum = "7";
  pokeType = "Water";
  pokeHeight = "0.5m";
  pokeWeight = "9.0kg";
  pokeDesc = "It shelters itself in its shell, then strikes back with spouts of water at every opportunity.";
}
