import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { AuthenticationService } from '../../authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:User;
  message:String=null;

  constructor(private authService:AuthenticationService,private router: Router) { 
    this.user=new User();
  }

  ngOnInit() {
  }

  loginUser() {
    console.log("Login user", this.user);
    
    this.authService.loginUser(this.user).subscribe(data => {
      console.log("Login successful");
      if(data['token']) {
        this.authService.setToken(data['token']);
        this.router.navigate(['/music/gettoptracks']);
      }
          
    },
       error =>{
        this.message=error['error']; 
      });
  }

  checkMessage()
{
  if(this.message==null)
  {
    return true;
  }
  else
  {
    return false;
  }
}



}
