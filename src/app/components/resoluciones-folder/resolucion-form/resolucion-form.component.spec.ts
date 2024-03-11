import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolucionFormComponent } from './resolucion-form.component';

describe('ResolucionFormComponent', () => {
  let component: ResolucionFormComponent;
  let fixture: ComponentFixture<ResolucionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResolucionFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResolucionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
