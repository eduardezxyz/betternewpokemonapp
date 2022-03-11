import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { PokeService } from '../poke.service';
import { pokeApi } from '../pokemon';

@Component({
  selector: 'app-pageone',
  templateUrl: './pageone.component.html',
  styleUrls: ['./pageone.component.scss']
})
export class PageoneComponent implements OnInit, OnDestroy {

  pokeSingle = new pokeApi();// new variable to be used in getPokemonSingle from the instance of pokeApi
  onDestroy$: Subject<void> = new Subject<void>(); // creating a subject called onDestroy to use in the ngOnDestroy function

  constructor(private pokeInfo: PokeService) { } // new variable to be used in getPokemonSingle from the instance of pokeApi

  ngOnInit(): void {
    this.pokeInfo.$pokeSingle.pipe(takeUntil(this.onDestroy$))
      .subscribe($poke => this.pokeSingle = $poke); // creates a pipe and by subcribing gets the the data from the previous page it was on (pokemon.component.html).å
  }

  // A destroy function to basically unsubscribe to a certain observable.
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
