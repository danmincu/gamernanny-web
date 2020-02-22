import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { takeUntil, map, tap, mergeAll } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FauthService } from '../shared/services/fauth.service';

// note: this is only differentiating between the logged in users, another "gate" should be 
// used for logged vs not logged users.

@Directive({ selector: '[loginGranted]'})
export class LoginGrantedDirective implements OnDestroy {

  private destroy$ = new Subject<void>();

  private hasView = false;

  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef,
              private authService: FauthService) {
  }

  @Input() set loginGranted([negate]: [boolean?]) {
      this.authService.customclaims$
        .pipe(
          //tap(c => console.log(c)),
          takeUntil(this.destroy$),
          map((claims) => {
            if (!(!!negate)) {
              return !!claims ? true : false;
            } else {
              return !!claims ? false : true;
            }
          })
        ).subscribe((can: boolean) => {
          if (can && !this.hasView) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.hasView = true;
          } else if (!can && this.hasView) {
            this.viewContainer.clear();
            this.hasView = false;
          }
        });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}