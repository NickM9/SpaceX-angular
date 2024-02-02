import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchpadTableComponent } from './launchpad-table.component';

describe('LaunchpadTableComponent', () => {
  let component: LaunchpadTableComponent;
  let fixture: ComponentFixture<LaunchpadTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaunchpadTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LaunchpadTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
