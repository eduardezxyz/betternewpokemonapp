import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  static isChief(Position: any) {
    throw new Error('Method not implemented.');
  }
  title = 'newbetterpokemonapp';
}
