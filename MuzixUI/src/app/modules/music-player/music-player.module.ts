import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { ContainerComponent } from './components/container/container.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { SearchMusicComponent } from './components/search-music/search-music.component';
import { FmContainerComponent } from './components/fm-container/fm-container.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './token-interceptor.service';
import { MusicplayerService } from './musicplayer.service';
import { MusicRouterModule } from './music-routing.module';
import { MusicCardComponent } from './components/music-card/music-card.component';

@NgModule({
  declarations: [
    ContainerComponent, 
    PlaylistComponent, 
    SearchMusicComponent, 
    FmContainerComponent, MusicCardComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    MusicRouterModule
  ],
  exports: [
    MusicRouterModule
  ],
  providers: [
    MusicplayerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ]

})
export class MusicPlayerModule { }
