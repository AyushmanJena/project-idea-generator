import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotScreenComponent } from './slot-screen.component';

describe('SlotScreenComponent', () => {
  let component: SlotScreenComponent;
  let fixture: ComponentFixture<SlotScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlotScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlotScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
