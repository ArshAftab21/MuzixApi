import { Component, OnInit } from '@angular/core';
import { Music } from '../../music';
import { MusicplayerService} from '../../musicplayer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fm-container',
  template: '<app-container [musics]="musics"></app-container>',
  styleUrls: ['./fm-container.component.css']
})
export class FmContainerComponent implements OnInit {

  musics:Array<Music>;
  musicType:string;


  constructor(private musicService:MusicplayerService,private route:ActivatedRoute) {
    this.musics =[];
    this.route.data.subscribe((data)=>{
      this.musicType=data.musicType
      console.log(this.musicType)
    })
   }

  ngOnInit() {
    this.musicService.getMusic(this.musicType).subscribe(
      (musics)=>{
        this.musics.push(...musics)
      }
    )

  }

}
