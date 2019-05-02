import { Component, OnInit } from '@angular/core';
import { Music } from '../../music';
import { MusicplayerService} from '../../musicplayer.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-search-music',
  templateUrl: './search-music.component.html',
  styleUrls: ['./search-music.component.css']
})
export class SearchMusicComponent implements OnInit {

  musics: Array<Music>;
  message: string;

  constructor(private musicService:MusicplayerService, private matSnackBar:MatSnackBar) { }

  ngOnInit() {
  }

  onEnter(searchKey){
    console.log("Search Key",searchKey);
    let message="No such track exists! Try a different keyword"
    this.musicService.searchMusic(searchKey).subscribe((musics)=>{
      if(musics.length===0){
        this.matSnackBar.open(message,'',{
          duration:1000
        });
      }
      this.musics=musics;
    });
  }

}
