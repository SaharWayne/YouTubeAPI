import { Component, OnInit } from '@angular/core';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { NgForm } from '@angular/forms';

import { ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injector } from '@angular/core';

@Component({
  selector: 'app-video-direct',
  templateUrl: './video-direct.component.html',
  styleUrls: ['./video-direct.component.css', '../app.component.css']
})

export class VideoDirectComponent implements OnInit {

  private sources_regex: Object = {
    "youtube": {
      "pattern": /^https:\/\/?(www\.)?((youtube\.com\/watch\?v=)|(youtu.be\/))([a-zA-Z0-9\-_])+/,
      "queries": ["v=", null],
      "idLength": 11
    }
  }

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef, private injector: Injector) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    if (f.disabled) { // previous search in progress
      return;
    }

    if ("url" in f.value) {
      var url = f.value["url"].trim();
      if (url.length > 0) {
        f.control["disable"]();

        var video: any = {};
        this.validateUrl(url, video);

        if (video.source) {
          this.playVideo(video.id, video.source);
          f.control["enable"]();
        } else {
          alert("URL Invalid");
          setTimeout(function() {
            document.getElementById("url").focus();
          }, 200);
        }

        f.control["enable"]();
      }
    }
  }

  validateUrl(url: string, video: any) {
    const ref = this.sources_regex;
    var regex: any, match: any;

    Object.keys(ref).forEach(function (source: any) {
      // console.log(this.sources_regex);
      regex = ref[source].pattern;
      match = url.match(regex);

      if (match) {
        var id, i1;
        for (var i = 0; i < ref[source].queries.length; i++) {
          var query = ref[source].queries[i];

          if (query == null) {
            i1 = url.lastIndexOf('/');
            id = url.substring(i1 + 1, i1 + 1 + ref[source].idLength);
          } else if ((i1 = url.indexOf(query)) > -1) {
            id = url.substring(i1 + query.length, i1 + query.length + ref[source].idLength);
          } else {
            continue;
          }

          video.id = id;
          video.source = source;
          return;
        }
      }
    });

    // const regex = /^https:\/\/?(www\.)?((youtube\.com\/watch\?v=)|(youtu.be\/))([a-zA-Z0-9\-_])+/

    // Matches all 4 cases:
    // https://www.youtube.com/watch?v=6QjIHnb5Ivs
    // https://youtu.be/6QjIHnb5Ivs?t=37
    // https://www.youtube.com/watch?v=6QjIHnb5Ivs&feature=youtu.be#t=37
    // https://youtu.be/6QjIHnb5Ivs

    // A valid url ends with the video id. the rest isn't checked 
    // (for example "&feature=youtu.be#t=37" isn't checked)
  }

  playVideo(id: string, source: string) {
    // Create a component reference from the component
    const videoPlayerCompRef = this.componentFactoryResolver
      .resolveComponentFactory(VideoPlayerComponent).create(this.injector);

    // Bind data to component’s inputs
    videoPlayerCompRef.instance.selfDestroy = function () { videoPlayerCompRef.destroy(); };
    videoPlayerCompRef.instance.videoId = id;
    videoPlayerCompRef.instance.videoSource = source;

    // Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(videoPlayerCompRef.hostView);

    // Get DOM element from component
    const domElem = (videoPlayerCompRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    // Append Loding DOM element to the body
    document.getElementById('body').appendChild(domElem);
  }

}


