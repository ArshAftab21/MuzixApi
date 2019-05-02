import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Music } from './music';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MusicplayerService {

  apiKey: string;
  fmEndPoint: string;
  tracklistEndpoint: string;


  constructor(private http: HttpClient) {
    this.apiKey = 'api_key=b08363ddc6fcb4e2ecad4d130f7496f9';
    this.fmEndPoint = 'http://ws.audioscrobbler.com/2.0/';
    this.tracklistEndpoint = 'http://localhost:8088/api/music/';
   }

   getMusic(musicType: string): Observable<Array<Music>> {
    const endPoint = `${this.fmEndPoint}?method=chart.${musicType}&${this.apiKey}&format=json`;
    return this.http.get(endPoint).pipe(
      retry(3),
      map(this.pickMusicResults),
      map(this.transForm.bind(this))
    );
  }

  pickMusicResults(response) {
    return response['tracks']['track'];
  }


  transForm(musics): Array<Music> {
    console.log(musics);
    let arr = [];
    for (let object of musics) {
      let music: Music = new Music();
      music.name = object['name'];
      music.artistName = object.artist.name;
      music.imageUrl = object.image[3]['#text'];
      music.url = object.url;
      arr.push(music);
    }
    return arr;
  }

  addMusicToPlaylist(track) {
    return this.http.post(this.tracklistEndpoint, track);
  }

  getPlaylistMusic(): Observable<Array<Music>> {
    return this.http.get<Array<Music>>(this.tracklistEndpoint);
  }

  deleteMusicFromPlaylist(music:Music) {
    const delUrl = `${this.tracklistEndpoint}${music.id}`;
    return this.http.delete(delUrl, { responseType: 'text' });
  }

  searchMusic(track: string): Observable<Array<Music>> {
    if (track.length > 0) {
      const searchEndpoint = `${this.fmEndPoint}?method=track.search&track=${track}&${this.apiKey}&format=json`;
      return this.http.get(searchEndpoint).pipe(
        map(object => {
          return object['results']['trackmatches']['track'];
        }),
        map(this.transForm.bind(this)));
    }
  }


}
