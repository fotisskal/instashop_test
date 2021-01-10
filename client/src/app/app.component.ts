import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";
import {AccountService, AlertService, ContentService} from './_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
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
              private alertService: AlertService) {
    this.accountService.user.subscribe(x => {
        if (x) {
          this.links = [
            {title: 'Home', fragment: 'home'},
            {title: 'Logout', fragment: 'home'}
          ];
        }
    })
  }

  ngOnInit(): void {
    this.alertService.clear();
    this.isHomeContentLoaded = this.contentService.isContentLoaded;
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isCollapsed = true;
      }
    });
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
