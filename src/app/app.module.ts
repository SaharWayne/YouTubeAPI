import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { VideoSearcherComponent } from './video-searcher/video-searcher.component';
import { VideoDirectComponent } from './video-direct/video-direct.component';
import { VideoPlayerComponent } from './video-player/video-player.component';

@NgModule({
  declarations: [
    AppComponent,
    VideoSearcherComponent,
    VideoDirectComponent,
    VideoPlayerComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [VideoPlayerComponent],
  providers: [VideoPlayerComponent],
  bootstrap: [AppComponent],
  entryComponents: [VideoPlayerComponent]
})
export class AppModule { }
