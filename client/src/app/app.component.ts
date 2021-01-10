import {AfterViewChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";
import {AccountService, AlertService, ContentService} from './_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterViewChecked{
  isCollapsed = true;
  isHomeContentLoaded = false;
  links = [
    {title: 'Home', fragment: 'home'},
    {title: 'Login', fragment: 'login'}
  ];
  footerExcluded = ["/login", "/edit"];

  constructor(public route: ActivatedRoute,
              public router: Router,
              private accountService: AccountService,
              private contentService: ContentService,
              private alertService: AlertService,
              private cdRef : ChangeDetectorRef) {
    this.accountService.user.subscribe(x => {
        if (x) {
          this.links = [
            {title: 'Home', fragment: 'home'},
            {title: 'Logout', fragment: 'home'}
          ];
        }
    });
  }

  ngOnInit(): void {
    this.alertService.clear();
    this.contentService.isContentLoaded.subscribe(next => {
      this.isHomeContentLoaded = next;
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isCollapsed = true;
      }
    });
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  logout(): void {
    if (this.accountService.isLoggedIn()) {
      this.accountService.logout();
      this.links = [
        {title: 'Home', fragment: 'home'},
        {title: 'Login', fragment: 'login'}
      ];
    }
  }

}
