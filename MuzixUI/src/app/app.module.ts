import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { SharedModule } from './modules/shared/shared.module';
import { MusicPlayerModule } from './modules/music-player/music-player.module';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './authguard.service';

const appRoutes:Routes = [

  {
    path:'',
    redirectTo: '/login',
    pathMatch:'full'
  }
]


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    SharedModule,
    MusicPlayerModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
