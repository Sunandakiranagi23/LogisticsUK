import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import {
  NavigationMenu,
  NavigationMenuResponseData,
} from '../models/menu.model';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private readonly url: string = 'assets/data/menu.json';

  constructor(private readonly http: HttpClient) {}

  loadSidebar(): Observable<NavigationMenu[]> {
    return this.http
      .get<NavigationMenuResponseData>(this.url)
      .pipe(map((response: NavigationMenuResponseData) => response.data));
  }
}
