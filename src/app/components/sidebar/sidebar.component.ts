import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/siderbar.service';
import { NavigationMenu } from '../../models/menu.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  navigationMenu: NavigationMenu[] = [];
  errorMessage: string = '';

  constructor(protected sidemenuService: SidebarService) {}

  ngOnInit(): void {
    this.loadSidebarMenu();
  }

  private loadSidebarMenu(): void {
    this.sidemenuService.loadSidebar().subscribe({
      next: (data) => {
        this.navigationMenu = data;
      },
      error: (err) => {
        this.errorMessage =
          'Failed to load sidebar menu. Please try again later.';
        console.error('Error loading sidebar menu:', err);
      },
    });
  }
}
