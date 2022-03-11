import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
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
    private router: Router
  ) { } // need this constructor to subsribe to the getPokemonSingle observable in the ngOnInit function

  pokeSingle: pokeApi = new pokeApi(); // new variable to be used in getPokemonSingle from the instance of pokeApi
  pokeNameUrl: any;
  pokeType2: string = '';
  pokeEntry: string = '';

  ngOnInit(): void {
    this.pokeNameUrl = this.route.snapshot.paramMap.get('name'); // get the route called name in the url so we can store it to the next line of code.
    this.pokeService.getPokemonSingle(this.pokeNameUrl).subscribe(response => {
      if (this.pokeSingle.types.length <= 1) {
        this.pokeType2 = this.pokeSingle.types[0].type.name;
      }
      else {
        this.pokeType2 = this.pokeSingle.types[0].type.name;
        this.pokeType2 = this.pokeType2 + " " + this.pokeSingle.types[1].type.name;
      }

      if (this.pokeSingle.abilities.length <= 1) {
        this.pokeEntry = this.pokeSingle.abilities[0].ability.name;
      }
      else {
        this.pokeEntry = this.pokeSingle.types[0].type.name;
        this.pokeEntry = this.pokeType2 + " " + this.pokeSingle.types[1].type.name;
      }

      this.pokeSingle = response;
    }, (error) => {
      this.router.navigate(['/pokedex']);
      console.log('An unexpected error occured');
      console.log(error);
    }); // Subscribe to the getPokemonSingle observable in our poke.service file
    this.getPokemonSingle();// calls on the function in the file
  }

  // a function to subscribe to the observable in the service file.
  getPokemonSingle(): void {
    this.pokeService.$pokeSingle.subscribe(pokeSingle => this.pokeSingle = pokeSingle);
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
