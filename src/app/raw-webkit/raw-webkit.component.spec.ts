import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RawWebkitComponent } from './raw-webkit.component';

describe('RawWebkitComponent', () => {
  let component: RawWebkitComponent;
  let fixture: ComponentFixture<RawWebkitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RawWebkitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RawWebkitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
