import { Component, OnInit } from '@angular/core';
import {first} from 'rxjs/operators';
import {AlertService, ContentService} from '../_services';
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  landmarks = null;
  imageModal: boolean;
  editModal: boolean;
  selectedFile: File = null;
  loading = false;
  modalImageUrl = null;
  isModalImageLoaded: boolean = false;

  constructor(private landmarksService: ContentService,
              private spinner: NgxSpinnerService,
              private alertService: AlertService) { }

  ngOnInit() {
    this.landmarksService.isContentLoaded.next(false);
    this.alertService.clear();
    this.spinner.show();
    this.landmarksService.getLandmarks()
      .pipe(first())
      .subscribe(landmarks => {
        this.landmarks = landmarks;
        let imagesToPreload = this.getImagesToLoad();
        let imagesLoaded = 0;
        for(let i=0; i<imagesToPreload.length; i++) {
          const img = new Image();
          img.src = imagesToPreload[i];
          img.addEventListener('load', () => {
            imagesLoaded++;
            if (imagesLoaded === imagesToPreload.length) {
              this.landmarksService.isContentLoaded.next(true);
              this.spinner.hide();
            }
          });
        }
      });
  }

  getImagesToLoad(): Array<string> {
    let images: Array<string> = [];
    for(let i=0; i<this.landmarks.length; i++) {
      if (this.landmarks[i].photo_thumb) {
        images.push(this.landmarks[i].photo_thumb.url);
      }
    }
    return images;
  }

  showImageModal(imageUrl)
  {
    if (!this.imageModal) {
      this.imageModal = true; // Show-Hide Modal Check
      const img = new Image();
      img.src = imageUrl;
      img.addEventListener('load', () => {
        this.isModalImageLoaded = true;
        this.modalImageUrl = imageUrl;
      });

    }
  }

  hideImageModal()
  {
    this.isModalImageLoaded = false;
    this.imageModal = false;
  }

}
