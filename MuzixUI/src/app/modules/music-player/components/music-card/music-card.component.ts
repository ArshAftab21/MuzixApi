import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Music } from '../../music';

@Component({
  selector: 'app-music-card',
  templateUrl: './music-card.component.html',
  styleUrls: ['./music-card.component.css']
})
export class MusicCardComponent implements OnInit {

  @Input()
  music: Music;

  @Input()
  usePlaylistApi: boolean;

  @Output()
  addMusic = new EventEmitter();

  @Output()
  deleteMusic = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  addToFavorites() {
    console.log("inside add");
    
    this.addMusic.emit(this.music);
  }

  deleteFromFavorites() {
    this.deleteMusic.emit(this.music);
  }


}
