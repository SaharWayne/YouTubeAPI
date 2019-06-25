import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoDirectComponent } from './video-direct.component';

describe('VideoDirectComponent', () => {
  let component: VideoDirectComponent;
  let fixture: ComponentFixture<VideoDirectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoDirectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoDirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
