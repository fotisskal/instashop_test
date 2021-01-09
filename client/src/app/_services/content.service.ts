import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

import { environment } from '../../environments/environment';
import { Landmark } from '../_models';

@Injectable({ providedIn: 'root' })
export class ContentService {
  isContentLoaded: boolean;

  constructor(
    private http: HttpClient
  ) {
  }

  getLandmarks() {
    let landmarks = this.http.get<Landmark[]>(`${environment.apiUrl}/api/landmarks`);
    return landmarks;
  }

  getLandmark(id: string): Observable<Landmark> {
    let landmark = this.http.get<Landmark>(`${environment.apiUrl}/api/landmark/${id}`);
    return landmark;
  }
}
