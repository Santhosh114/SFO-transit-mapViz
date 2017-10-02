import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleroutesComponent } from './toggleroutes.component';

describe('ToggleroutesComponent', () => {
  let component: ToggleroutesComponent;
  let fixture: ComponentFixture<ToggleroutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToggleroutesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleroutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
