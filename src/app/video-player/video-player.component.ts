import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {

  private safeSrcUrl: SafeResourceUrl;
  public selfDestroy: Function;
  public videoId: any;
  public videoSource: any;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    const videoEmbedUrl = this.buildEmbedUrl();
    this.safeSrcUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoEmbedUrl);
  }

  buildEmbedUrl() {
    var url: string;

    switch (this.videoSource) {
      case "youtube":
        url = `https://www.youtube.com/embed/${this.videoId}?autoplay=1`;
        break;
      default:
        url = null;
        break;
    }

    return url;
  }

  onClickOutOfBounds() {
    this.selfDestroy();
  }
}
