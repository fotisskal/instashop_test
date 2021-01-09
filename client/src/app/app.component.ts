import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService, ContentService} from './_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  isCollapsed = true;
  links = [
    {title: 'Home', fragment: 'home'},
    {title: 'Login', fragment: 'login'}
  ];
  footerExcluded = ["/login", "/edit"];

  constructor(public route: ActivatedRoute,
              public router: Router,
              private accountService: AccountService,
              private contentService: ContentService) {
    this.accountService.user.subscribe(x => {
        if (x) {
          this.links = [
            {title: 'Home', fragment: 'home'},
            {title: 'Logout', fragment: 'home'}
          ];
        }
    })
  }

  ngOnInit(): void {}

  logout(): void {
    if (this.accountService.isLoggedIn()) {
      this.accountService.logout();
      this.links = [
        {title: 'Home', fragment: 'home'},
        {title: 'Login', fragment: 'login'}
      ];
    }
  }

  isContentLoaded() {
    return this.contentService.isContentLoaded;
  }
}
