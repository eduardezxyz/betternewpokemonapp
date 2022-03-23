import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokedexComponent } from './pokedex/pokedex.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { PoketrainerComponent } from './poketrainer/poketrainer.component';

const routes: Routes = [
  { path: '', redirectTo: 'pokedex', pathMatch: 'full'},
  { path: 'pokedex', component: PokedexComponent},
  { path: 'pokemon', redirectTo: 'pokedex'},
  { path: 'pokemon/:name', component: PokemonComponent},
  { path: 'poketrainer', component: PoketrainerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
