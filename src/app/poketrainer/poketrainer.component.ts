import { Component, OnInit } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import { environment } from 'src/environments/environment';
import DataService from 'src/services/odata/data-service';

@Component({
  selector: 'app-poketrainer',
  templateUrl: './poketrainer.component.html',
  styleUrls: ['./poketrainer.component.scss']
})
export class PoketrainerComponent implements OnInit {

  PokeTrainerDS!: any;

  constructor(private odataservice: DataService) { 

  }

  ngOnInit(): void {
    this.PokeTrainerDS = {
      store: {type: 'odata', version: 4, url:  environment.apiUri + '/odata/PokeTrainers', key: 'Id'} 
      // filter: ['ProducerId','=',this.producerId]
    };
  }

}
