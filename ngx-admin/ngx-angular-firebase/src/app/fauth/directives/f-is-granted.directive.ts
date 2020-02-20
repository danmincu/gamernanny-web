import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { takeUntil, map, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FauthService } from '../shared/services/fauth.service';

// note: this is only differentiating between the logged in users, another "gate" should be 
// used for logged vs not logged users.

@Directive({ selector: '[fIsGranted]'})
export class FIsGrantedDirective implements OnDestroy {

  private destroy$ = new Subject<void>();

  private hasView = false;

  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef,
              private accessChecker: FauthService) {
  }

  @Input() set fIsGranted([claim, value]: [string, string]) {

    console.log("fIsGranted");
    this.accessChecker.customclaims$
      .pipe(
        //tap(c => console.log("here")),
        takeUntil(this.destroy$),
        map((claims) => { 
            // console.log(String(claims[claim]));
            // console.log(String(claim));
            // console.log(String(value));
            // console.log(String(claims[claim]) === String(value));
            return String(claims[claim]) === String(value);
        })
      )
      .subscribe((can: boolean) => {
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