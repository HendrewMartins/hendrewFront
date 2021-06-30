import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisaboletimComponent } from './pesquisaboletim.component';

describe('PesquisaboletimComponent', () => {
  let component: PesquisaboletimComponent;
  let fixture: ComponentFixture<PesquisaboletimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PesquisaboletimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PesquisaboletimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
