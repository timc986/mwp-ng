import { AuthenticationService } from './service/authentication.service';
import { NotificationService } from './service/notification.service';
import { AppConfig } from './config/app-config';
import { JwtInterceptor } from './shared/jwt.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './material.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecordComponent } from './record/record.component';
import { CreateRecordComponent } from './create-record/create-record.component';
import { RecordService } from './service/record.service';

export function appConfigFactory(appConfig: AppConfig) {
  return () => appConfig.load();
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    RecordComponent,
    CreateRecordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [
    NotificationService,
    RecordService,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [
        AppConfig,
        HttpClient
      ],
      useFactory: appConfigFactory
    },
    AppConfig
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
