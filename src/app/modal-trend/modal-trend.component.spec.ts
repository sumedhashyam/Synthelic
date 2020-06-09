import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTrendComponent } from './modal-trend.component';

describe('ModalTrendComponent', () => {
  let component: ModalTrendComponent;
  let fixture: ComponentFixture<ModalTrendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTrendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
