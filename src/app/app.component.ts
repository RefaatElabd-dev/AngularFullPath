import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { LoggingService } from './shared/logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private _logService: LoggingService){

  }
  ngOnInit(): void {
    this.authService.autoLogin();
    this._logService.printLog("Log From App Component");
  }
  title = 'Angular Full path';
}
