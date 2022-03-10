import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  pokeName = "Squirtle";
  pokeSmolDesc = "(Tiny Turtle Pokemon)"
  pokeNum = "7";
  pokeType = "Water";
  pokeHeight = "0.5m";
  pokeWeight = "9.0kg";
  pokeDesc = "It shelters itself in its shell, then strikes back with spouts of water at every opportunity.";
}
