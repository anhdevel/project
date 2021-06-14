import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildOrderComponent } from './build-order.component';

describe('BuildOrderComponent', () => {
  let component: BuildOrderComponent;
  let fixture: ComponentFixture<BuildOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
