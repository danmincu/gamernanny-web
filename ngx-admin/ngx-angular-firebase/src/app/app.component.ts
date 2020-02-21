/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';
import { delay } from 'rxjs/operators';
import { Subject, BehaviorSubject } from 'rxjs';
import { FauthService } from './fauth/shared/services/fauth.service';

@Component({
  selector: 'ngx-app',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  doneLoading = new BehaviorSubject<boolean>(false);
  constructor(private analytics: AnalyticsService, private seoService: SeoService, private authService: FauthService) {
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
    setTimeout(() => {this.doneLoading.next(true)}, 5000);
    //this.authService.customclaims$.subscribe((c)=> console.log(c));
  }
}
