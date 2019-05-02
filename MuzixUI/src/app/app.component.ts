import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from './modules/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MuzixUI';
  constructor(private auth:AuthenticationService, private routes: Router)
  {}

  logout(){
    this.auth.deleteToken();
    this.routes.navigate(['/login']);
  }

}
