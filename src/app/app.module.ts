import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRouting } from './app-routing-module';
import * as fromApp from './Store/app.reducer';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { LoggingService } from './shared/logging.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRouting,
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducer),
    SharedModule,
    CoreModule
  ],
  bootstrap: [AppComponent],
  providers: [LoggingService]
})
export class AppModule { }
