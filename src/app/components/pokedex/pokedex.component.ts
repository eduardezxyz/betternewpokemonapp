import { Component, OnInit } from '@angular/core';
import { parentListResults } from '../../pokemon';
import { PokeService } from '../../poke.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  pokemons: parentListResults[] = []; // gets the first 20 pokedex entry. Data only with name and url of the pokemons different info.
  pokeIds: string[] = [];
  pokeLong: string = '';
  constructor(private $pokeService: PokeService) { }

  ngOnInit(): void {
    this.getPokesList(); // calls the function to get the different information the pokemon has from the API.
  }

  getPokesList(): void {
    this.$pokeService.getPokeList()//subscribe to the observable from function getPokeList() in the file poke.service.ts
      .subscribe($pokemons => {

        this.pokemons = $pokemons.results;

        for (let i = 0; i < this.pokemons.length; i++) {
          this.$pokeService.getPokemonSingle(this.pokemons[i].name)
            .subscribe(result => {
              this.pokemons[i].id = result.id;
              this.pokemons[i].front_default = result.sprites.front_default;
            });// end of getPokemonSingle subcribe
        }// end of forloop
      })// end of getPokeList subscribe
  }
}
