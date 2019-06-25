import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoSearcherComponent } from './video-searcher.component';

describe('VideoSearcherComponent', () => {
  let component: VideoSearcherComponent;
  let fixture: ComponentFixture<VideoSearcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoSearcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
