import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingComponent } from "./landing.component";
import { LandingRoutingModule } from './landing-routing.module';

import { HeaderLandingComponent } from './header-landing/header-landing.component';
import { BodyLandingComponent } from './body-landing/body-landing.component';

import { FooterLandingComponent } from './footer-landing/footer-landing.component';



@NgModule({
  declarations: [
    LandingComponent,
    HeaderLandingComponent,
    BodyLandingComponent,

    FooterLandingComponent,
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,

  ],
  exports: [
    FooterLandingComponent,
  ],
})
export class LandingModule { }
