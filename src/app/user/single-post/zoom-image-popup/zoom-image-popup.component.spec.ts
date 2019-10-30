import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomImagePopupComponent } from './zoom-image-popup.component';

describe('ZoomImagePopupComponent', () => {
  let component: ZoomImagePopupComponent;
  let fixture: ComponentFixture<ZoomImagePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoomImagePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomImagePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
