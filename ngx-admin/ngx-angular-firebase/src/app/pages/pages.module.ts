import { NgModule } from '@angular/core';
import { NbMenuModule, NbButtonModule, NbCardModule, NbLayoutModule, NbSidebarModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { AboutComponent } from './about/about.component';
import { FauthModule } from '../fauth/fauth.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbButtonModule,
    NbLayoutModule,
    NbSidebarModule,
    FauthModule,
    NbCardModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
  ],
  declarations: [
    PagesComponent, AboutComponent
  ],
})
export class PagesModule {
}
