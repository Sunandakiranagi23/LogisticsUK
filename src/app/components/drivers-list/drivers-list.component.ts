import { Component, OnInit } from '@angular/core';
import { DriverService } from '../../services/driver.service';
import { Driver, Trace } from '../../models/drivers.model';

@Component({
  selector: 'app-drivers-list',
  templateUrl: './drivers-list.component.html',
})
export class DriversListComponent implements OnInit {
  driversList: Driver[] = [];
  filteredDriversList: Driver[] = [];
  searchQuery: string = '';
  weekStartDate: Date = new Date(2021, 1, 1);
  daysOfWeek: Date[] = [];
  readonly numberOfDaysInAWeek: number = 7;
  errorMessage: string | null = null;

  constructor(protected driverService: DriverService) {}

  ngOnInit(): void {
    this.loadDrivers();
    this.createWeekDays(this.weekStartDate);
  }

  private loadDrivers(): void {
    this.driverService.getDrivers().subscribe({
      next: (drivers) => {
        this.driversList = drivers;
        this.filteredDriversList = [...drivers];
      },
      error: (err) => {
        this.errorMessage = err.message;
      },
    });
  }
  // Method to calculate total duration of activities in a trace
  calculateTotalDuration(traces: Trace[]): number {
    let totalDuration = 0;
    traces.forEach((trace) => {
      totalDuration = trace.activity?.reduce(
        (total, activity) => total + activity.duration,
        totalDuration
      );
    });

    return totalDuration;
  }

  createWeekDays(start: Date) {
    for (let i = 0; i < this.numberOfDaysInAWeek; i++) {
      const nextDate = new Date(start);
      nextDate.setDate(start.getDate() + i);
      this.daysOfWeek.push(nextDate);
    }
  }

  hasDayActivities(day: Date, traces: Trace[]): boolean {
    const formattedDate = day.toISOString().split('T')[0];
    return traces.some(
      (trace) => trace.date === formattedDate && trace.activity.length > 0
    );
  }

  filterDrivers(): void {
    this.filteredDriversList = this.driversList.filter((driver) =>
      driver.forename
        .toLowerCase()
        .includes(this.searchQuery.trim().toLowerCase())
    );
  }
}
