import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserDComponent } from './updateUserD.component';

describe('UpdateUserDComponent', () => {
  let component: UpdateUserDComponent;
  let fixture: ComponentFixture<UpdateUserDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateUserDComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUserDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
