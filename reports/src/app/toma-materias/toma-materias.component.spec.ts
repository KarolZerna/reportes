import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TomaMateriasComponent } from './toma-materias.component';

describe('TomaMateriasComponent', () => {
  let component: TomaMateriasComponent;
  let fixture: ComponentFixture<TomaMateriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TomaMateriasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TomaMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
