import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './guard';
import { JwtInterceptor } from './interceptor';

/**
 * This module is for classes used by app.module. Resources which are always loaded such as route
 * guards, HTTP interceptors, and application level services, such as the ThemeService and logging
 * belong in this directory.
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ]
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import in your base AppModule only.');
    }
  }
}
