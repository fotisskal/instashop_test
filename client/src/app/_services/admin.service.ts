import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import {Landmark} from '../_models';

@Injectable({ providedIn: 'root' })
export class AdminService {
  landmark: Landmark = null;

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
  }

  edit(title, shortInfo, description, file: File) {
    const formData: FormData = new FormData();
    console.log(this.landmark.objectId);
    formData.append('id', this.landmark.objectId);
    formData.append('title', title);
    formData.append('short_info', shortInfo);
    formData.append('description', description);
    formData.append("photo", file);
    return this.http.post(`${environment.apiUrl}/api/edit`, formData);
  }

  setLandmarkState(landmark): void {
    this.landmark = landmark;
  }

}
