import { Component, OnInit, Input } from '@angular/core';
import { Music } from '../../music';
import { MusicplayerService} from '../../musicplayer.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {

  @Input()
  musics: Array<Music>;

  @Input()
  usePlaylistApi: boolean;


  constructor(private service: MusicplayerService, private snackBar: MatSnackBar, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  addToPlaylist(music) {
    const message = `${music.name} added to Favorites`;
    // tslint:disable-next-line:no-shadowed-variable
    this.service.addMusicToPlaylist(music).subscribe(() => {
      this.snackBar.open(message, '', {
        duration: 1000
      });
    });
  }
  deleteFromPlaylist(music) {
    this.service.deleteMusicFromPlaylist(music).subscribe((result) => {
      let message = `${music.name} ${result}`;
      this.snackBar.open(message, '', {
        duration: 1000
      });
      const index = this.musics.indexOf(music);
      this.musics.splice(index, 1);
    });

}
}
