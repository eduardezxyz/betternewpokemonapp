import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MypokemonComponent } from './components/mypokemon/mypokemon.component';
import { PokedexComponent } from './components/pokedex/pokedex.component';
import { PokemonComponent } from './components/pokemon/pokemon.component';
import { PoketrainerComponent } from './components/poketrainer/poketrainer.component';

const routes: Routes = [
  { path: '', redirectTo: 'pokedex', pathMatch: 'full'},
  { path: 'pokedex', component: PokedexComponent},
  { path: 'pokemon', redirectTo: 'pokedex'},
  { path: 'pokemon/:name', component: PokemonComponent},
  { path: 'poketrainer', component: PoketrainerComponent},
  { path: 'poketrainer/:Id', component: MypokemonComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
