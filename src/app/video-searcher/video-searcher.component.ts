import { Component, OnInit } from '@angular/core';
import { FetcherService } from '../fetcher.service';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { NgForm } from '@angular/forms';

import { ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injector } from '@angular/core';

@Component({
  selector: 'app-video-searcher',
  templateUrl: './video-searcher.component.html',
  styleUrls: ['./video-searcher.component.css', '../app.component.css']
})

export class VideoSearcherComponent implements OnInit {

  
  private sources = [
    { name: 'YouTube', value: 'youtube' },
  ];
  private selectedSource = this.sources[0].value;
  private videos_data: any;

  constructor(private fetcherService: FetcherService, private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef, private injector: Injector) { }

  ngOnInit() {
  }

  onSearchSubmit(f: NgForm) {
    if (f.disabled) { // previous search in progress
      return;
    }

    if ('term' in f.value ) {
      let term = f.value['term'];

      if (term.length > 0) {
        f.control['disable']();

        this.fetcherService.getVideos(term, this.selectedSource).subscribe(data => {
          this.videos_data = data;
          f.control['enable']();
        });

      }
    }
  }

  onVideoClick(video) {
    // Create a component reference from the component
    const videoPlayerCompRef = this.componentFactoryResolver
      .resolveComponentFactory(VideoPlayerComponent).create(this.injector);

    // Bind data to component’s inputs
    videoPlayerCompRef.instance.selfDestroy = function () { videoPlayerCompRef.destroy(); };
    videoPlayerCompRef.instance.videoId = video.id.videoId;
    videoPlayerCompRef.instance.videoSource = this.selectedSource;

    // Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(videoPlayerCompRef.hostView);

    // Get DOM element from component
    const domElem = (videoPlayerCompRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    // Append Loding DOM element to the body
    document.getElementById('body').appendChild(domElem);
  }

}


