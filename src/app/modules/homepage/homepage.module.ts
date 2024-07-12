import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [LandingComponent],
  imports: [
    CommonModule,
    MatButtonModule
  ],
})
export class HomepageModule { }
