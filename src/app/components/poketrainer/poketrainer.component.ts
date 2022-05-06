import { Component, OnInit } from '@angular/core';
import { PokeService } from '../../poke.service';
import 'devextreme/data/odata/store';
import { parentPokeTrainerList } from '../../pokemon';

@Component({
  selector: 'app-poketrainer',
  templateUrl: './poketrainer.component.html',
  styleUrls: ['./poketrainer.component.scss']
})
export class PoketrainerComponent implements OnInit {

  PokemonDS!: any;
  PokeTrainers: parentPokeTrainerList[] = [];
  constructor(private $pokeService: PokeService,
  ) { }
  trainerId: any;

  ngOnInit(): void {
    this.getPokemonTrainers();
  }

  // Gets all the pokemon trainers 
  getPokemonTrainers(): void {
    this.$pokeService.getPokeTrainer().subscribe(pokeparty => {
      this.PokeTrainers = pokeparty.value;
    });
  }

  onEditorPreparing(e: any) {
    //target data Cells and the dataField
    if (e.parentType === "dataRow" && e.dataField === "PokedexEntry") {

      if (e.row.isNewRow) {
        e.editorOptions.disabled = false; //enabled only when new record
      }
      else {
        e.editorOptions.disabled = true; //disabled when existing
      }
    }
  }

}

