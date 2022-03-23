import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { HttpClientModule } from '@angular/common/http';
import { DxButtonModule, DxTagBoxModule, DxTemplateModule, DxTooltipModule } from 'devextreme-angular';


@NgModule({
  declarations: [
    AppComponent,
    PokemonComponent,
    PokedexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DxButtonModule,    
    DxTemplateModule,
    DxTagBoxModule,
    DxTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
