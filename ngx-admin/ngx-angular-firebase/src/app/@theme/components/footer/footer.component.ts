import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Created with ♥ by <b><a href="mailto:danmincu@gmail.com" target="_blank">Telekad</a></b> 2020</span>
    <div class="socials">
      <a href="https://github.com/danmincu" target="_blank" class="ion ion-social-github"></a>
      <a href="https://www.facebook.com/gamernanny" target="_blank" class="ion ion-social-facebook"></a>
      <a href="https://twitter.com/danmincu" target="_blank" class="ion ion-social-twitter"></a>
      <a href="https://www.linkedin.com/in/dan-mincu" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent {
}
