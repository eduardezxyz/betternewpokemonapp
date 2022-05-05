import { Component, OnInit } from '@angular/core';
import { PokeService } from '../poke.service';
import { parentMyPokeList, parentPartyList } from '../pokemon';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mypokemon',
  templateUrl: './mypokemon.component.html',
  styleUrls: ['./mypokemon.component.scss']
})
export class MypokemonComponent implements OnInit {

  PokeParty: parentPartyList[] = [];
  PokeIDList: number[] = [];
  indexCounter: number = 0;
  MyPoke: parentMyPokeList[] = [];
  pokePartyURL: any;
  PokemonDS!: any;

  constructor(
    private $pokeService: PokeService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getPokeParty();
    this.getMyPoke();
  }

  getPokeParty(): void {
    this.pokePartyURL = this.route.snapshot.paramMap.get('Id');
    this.$pokeService.getPokeParty().subscribe(pokeparty => {
      for (let i = 0; i < pokeparty.value.length; i++) {
        if (pokeparty.value[i].TrainerId == this.pokePartyURL) {
          this.PokeParty[this.indexCounter++] = pokeparty.value[i];
        }
      }
      this.indexCounter = 0;
    });
  }

  getMyPoke(): void {
    this.$pokeService.getMyPoke().subscribe(myPoke => {
      for (let j = 0; j < this.PokeParty.length; j++) {
        for (let i = 0; i < myPoke.value.length; i++) {
          if(this.PokeParty[j].MyPokeId == myPoke.value[i].Id){
            this.MyPoke[this.indexCounter] = myPoke.value[i];
            this.getPokeSprite(this.MyPoke[this.indexCounter].PokedexEntry,this.indexCounter);
            this.indexCounter++;
          }
        }
      }
    });
  }

  getPokeSprite(Id: number, index: number): void {
    this.$pokeService.getPokemonSingle(Id).subscribe($pokeSingle => {
      this.MyPoke[index].Sprite = $pokeSingle.sprites.front_default;
      return;
    });
  }

}
