import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { HttpClientModule } from '@angular/common/http';
import { DxButtonModule, DxDataGridModule, DxPopupModule, DxTagBoxModule, DxTemplateModule, DxTooltipModule } from 'devextreme-angular';
import { PoketrainerComponent } from './poketrainer/poketrainer.component';
import { MypokemonComponent } from './mypokemon/mypokemon.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonComponent,
    PokedexComponent,
    PoketrainerComponent,
    MypokemonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DxButtonModule,    
    DxTemplateModule,
    DxTagBoxModule,
    DxTooltipModule,
    DxDataGridModule,
    DxPopupModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
