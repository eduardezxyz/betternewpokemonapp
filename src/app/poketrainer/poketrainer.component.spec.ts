import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoketrainerComponent } from './poketrainer.component';

describe('PoketrainerComponent', () => {
  let component: PoketrainerComponent;
  let fixture: ComponentFixture<PoketrainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoketrainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoketrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
