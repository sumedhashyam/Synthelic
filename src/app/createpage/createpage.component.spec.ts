import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatpageComponent } from './creatpage.component';

describe('CreatpageComponent', () => {
  let component: CreatpageComponent;
  let fixture: ComponentFixture<CreatpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
