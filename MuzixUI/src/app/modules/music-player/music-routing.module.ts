import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './components/container/container.component';
import { AuthGuardService } from '../../authguard.service';
import { SearchMusicComponent } from './components/search-music/search-music.component';
import { FmContainerComponent } from './components/fm-container/fm-container.component';
import { PlaylistComponent } from './components/playlist/playlist.component';

const musicRoutes: Routes = [
    {
        path: 'music',
        children: [
            {
                path: '',
                redirectTo: 'music/gettoptracks',
                pathMatch: 'full',
                
            },
            {
                path: 'gettoptracks',
                component: FmContainerComponent,
                canActivate: [AuthGuardService],
                data: {
                    musicType: 'gettoptracks'
                },
            },
            {
                path: 'playlist',
                component: PlaylistComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'search',
                component: SearchMusicComponent,
                canActivate: [AuthGuardService]
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(musicRoutes),
    ],
    exports: [
        RouterModule,
    ]
})
export class MusicRouterModule { }
