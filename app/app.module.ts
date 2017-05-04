import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { XHRBackend, Request, XHRConnection, BrowserXhr, ResponseOptions, XSRFStrategy, Response} from '@angular/http';

import { SharedModule } from './Shared/shared.module';
import { HomeModule } from './Home/home.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceModule } from './service.module';
import { ErrorHttpService } from './error-http.service';

@NgModule({
  imports: [ BrowserModule, AppRoutingModule, SharedModule, HomeModule, ServiceModule.forRoot() ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ],
  providers: [
    { provide: XHRBackend,
      useClass: ErrorHttpService,
      useFactory: (browserXHR: BrowserXhr,
                   baseResponseOptions: ResponseOptions,
                   xsrfStrategy: XSRFStrategy) => {
        return new ErrorHttpService(browserXHR, baseResponseOptions, xsrfStrategy);
      },
      deps: [BrowserXhr, ResponseOptions, XSRFStrategy]
    }
  ]
})

export class AppModule {}
