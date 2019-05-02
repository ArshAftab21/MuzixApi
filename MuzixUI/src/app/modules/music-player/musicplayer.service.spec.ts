import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TestBed, inject, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MusicplayerService } from './musicplayer.service';
import { Observable } from 'rxjs';

const testConfig = {

    addMusic: {
      positive: {
        id: 1,
        name: 'testName',
        url: 'testUrl',
        artistName: 'testartistname',
        imageUrl: 'testimage'
      }
    }
  }

  describe('MusicPlayerService', () => {
    let musicService: MusicplayerService;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientModule, HttpClientTestingModule],
        providers: [MusicplayerService]
      });
      musicService = TestBed.get(MusicplayerService);
    });

  it('should be created MusicPlayer Service', 
   inject([MusicplayerService], (service: MusicplayerService) => {
    expect(service).toBeTruthy();
  }));

  it('should add music to playList', fakeAsync(() => {
    let data = testConfig.addMusic.positive;
    inject([MusicplayerService, HttpTestingController], (backend: HttpTestingController) => {
      const mockReq = backend.expectOne(musicService.tracklistEndpoint);
      expect(mockReq.request.url).toEqual(musicService.tracklistEndpoint, 'request url should match with json server api url');
      expect(mockReq.request.method).toBe('POST', 'Should handle requested method type');
      mockReq.flush(data);
      backend.verify();
    });
    musicService.addMusicToPlaylist(data).subscribe((res: any) => {
      expect(res).toBeDefined();
      expect(res._body).toBe(data, 'data should be same');
    });
  }));

  
it('should get music from playList', fakeAsync(() => {
    let data = testConfig.addMusic.positive;
    inject([MusicplayerService, HttpTestingController], (backend: HttpTestingController) => {
      const mockReq = backend.expectOne(musicService.tracklistEndpoint);
      expect(mockReq.request.url).toEqual(musicService.tracklistEndpoint, 'request url should match with json server api url');
      expect(mockReq.request.method).toBe('GET', 'Should handle requested method type');
      mockReq.flush(data);
      backend.verify();
    });
    musicService.getPlaylistMusic().subscribe((res: any) => {
      expect(res).toBeDefined();
      expect(res._body).toBe(data, 'data should be same');
    });
  }));
});
