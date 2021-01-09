import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import { Location } from '@angular/common';
import {AdminService, AlertService} from "../_services";
import {first} from "rxjs/operators";
import {Landmark} from "../_models";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  form: FormGroup;
  selectedFiles: FileList;
  currentFile: File;
  loading = false;
  submitted = false;
  landmark: Landmark = null;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private adminService: AdminService,
              private alertService: AlertService) {
    this.landmark = this.adminService.landmark;
  }

  ngOnInit(): void {
    this.landmark = this.adminService.landmark;
    this.form = this.formBuilder.group({
      title: [this.landmark.title],
      shortInfo: [this.landmark.short_info],
      description: [this.landmark.description]
    });
  }

  get f() { return this.form.controls; }

  exit(): void {
    this.location.back();
  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    this.loading = true;
    let file = null;
    if (this. selectedFiles && this.selectedFiles.length > 0) {
      file = this.selectedFiles[0];
    }
    this.adminService.edit(this.f.title.value, this.f.shortInfo.value, this.f.description.value, file)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigateByUrl("/home");
        },
        error: error => {
          this.alertService.warn(error.error.text);
          this.loading = false;
        }
      });
  }

}
