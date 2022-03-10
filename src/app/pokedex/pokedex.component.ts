import { Component, OnInit } from '@angular/core';
import { parentListResults, pokemonParentList } from '../pokemon';
import { PokeService } from '../poke.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  pokemons: parentListResults[] = []; // gets the first 20 pokedex entry. Data only with name and url of the pokemons different info.
  constructor(private $pokeService: PokeService) { }

  ngOnInit(): void {
    this.getPokesList();
  }

  getPokesList(): void {
    this.$pokeService.getPokeList()//subscribe to the observable from function getPokeList() in the file poke.service.ts
      .subscribe($pokemons => this.pokemons = $pokemons.results)
  }
}
