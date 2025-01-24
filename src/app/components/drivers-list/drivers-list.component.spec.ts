import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversListComponent } from './drivers-list.component';
import { DriverService } from 'src/app/services/driver.service';
import { HttpClientModule } from '@angular/common/http';

describe('DriversListComponent', () => {
  let component: DriversListComponent;
  let fixture: ComponentFixture<DriversListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DriversListComponent],
      imports: [HttpClientModule],
      providers: [DriverService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriversListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
