import { Component, OnInit } from '@angular/core';
import {AccountService, AdminService, AlertService, ContentService} from "../_services";
import {first} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-landmarks',
  templateUrl: './landmarks.component.html',
  styleUrls: ['./landmarks.component.css']
})
export class LandmarksComponent implements OnInit {
  landmark = null;
  id: string;
  googleMapType = 'roadmap';
  lat: number;
  long: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private landmarksService: ContentService,
              private accountService: AccountService,
              private editService: AdminService,
              private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.landmarksService.isContentLoaded.next(false);
    this.spinner.show();
    this.id = this.route.snapshot.params['id'];
    this.landmarksService.getLandmark(this.id)
      .pipe(first())
      .subscribe(landmark => {
        this.landmark = landmark
        this.long = this.landmark.location[0];
        this.lat = this.landmark.location[1];
        this.landmark.createdAt = new Date(this.landmark.createdAt).toLocaleString();
        this.landmark.updatedAt = new Date(this.landmark.updatedAt).toLocaleString();
        if (this.landmark.photo) {
          const img = new Image();
          img.src = this.landmark.photo.url;
          img.addEventListener('load', () => {
            this.landmarksService.isContentLoaded.next(true);
            this.spinner.hide();
          });
        }
        this.landmarksService.isContentLoaded.next(true);
        this.spinner.hide();
      });
  }

  isLoggedIn() {
    return this.accountService.isLoggedIn();
  }

  isAdmin() {
    return this.accountService.isAdmin();
  }

  onEdit(): void {
    this.editService.setLandmarkState(this.landmark);
    this.router.navigate(['/edit']);
  }

}
