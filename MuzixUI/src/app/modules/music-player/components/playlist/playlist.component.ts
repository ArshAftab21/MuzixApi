import { Component, OnInit } from '@angular/core';
import { Music } from '../../music';
import { MusicplayerService} from '../../musicplayer.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  musics: Array<Music>;
  usePlaylistApi: boolean = true;


  constructor(private musicService:MusicplayerService,private snackBar: MatSnackBar) {
    this.musics=[];
   }

  ngOnInit() {
    this.musicService.getPlaylistMusic().subscribe((musics) => {
      if (musics.length == 0) {
        this.snackBar.open('My Favorites is empty', '', {
          duration: 1000
        });
      }
      this.musics.push(...musics);    
   })

  }

}
