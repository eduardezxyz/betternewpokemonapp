import { Component, OnInit } from '@angular/core';
import { PokeService } from '../poke.service';
import 'devextreme/data/odata/store';
import { parentPokeTrainerList } from '../pokemon';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-poketrainer',
  templateUrl: './poketrainer.component.html',
  styleUrls: ['./poketrainer.component.scss']
})
export class PoketrainerComponent implements OnInit {

  PokemonDS!: any;
  PokeTrainers: parentPokeTrainerList[] = [];
  constructor(private $pokeService: PokeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  trainerId: any;

  ngOnInit(): void {
    this.PokemonDS = {
      store: { type: 'odata', version: 4, url: environment.apiUri + '/odata/Pokemons', key: 'PokedexEntry' }
      // filter: ['ProducerId','=',this.producerId]
    };
    this.getPokeTrainer();
  }

  getPokeTrainer(): void {
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

