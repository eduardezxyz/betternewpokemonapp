import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { HttpClientModule } from '@angular/common/http';
import { PageoneComponent } from './pageone/pageone.component';
import { DxButtonModule, DxTagBoxModule, DxTemplateModule } from 'devextreme-angular';


@NgModule({
  declarations: [
    AppComponent,
    PokemonComponent,
    PokedexComponent,
    PageoneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DxButtonModule,    
    DxTemplateModule,
    DxTagBoxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
