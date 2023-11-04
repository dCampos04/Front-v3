import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyLandingComponent } from './body-landing.component';

describe('BodyLandingComponent', () => {
  let component: BodyLandingComponent;
  let fixture: ComponentFixture<BodyLandingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BodyLandingComponent]
    });
    fixture = TestBed.createComponent(BodyLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
