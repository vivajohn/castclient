import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AudioPlusComponent } from './audio-plus.component';

describe('AudioPlusComponent', () => {
  let component: AudioPlusComponent;
  let fixture: ComponentFixture<AudioPlusComponent>;

  const audioStub = {
    play: (): void => {},
    pause: (): void => {},
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioPlusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioPlusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inputs', () => {
    component.playing.emit();
    expect(component).toBeTruthy();
  });

  it('should source', () => {
    component.src = null;
    component.src = 'http://fake.com/audio.mp3';
    expect(component).toBeTruthy();
  });

  it('should volume', () => {
    expect(component).toBeTruthy();
    component.volume = 50;
    expect(component.volume).toEqual(50);
    const temp = component.player;
    component.player = null;
    component.volume = 2;
    expect(component.volume).toEqual(0);
    component.player = temp;
  });

  it('should handle events', () => {
    component.ngOnInit();
    component.player.dispatchEvent(new Event('play'));
    component.player.dispatchEvent(new Event('pause'));
    component.player.dispatchEvent(new Event('ended'));
    component.player.dispatchEvent(new Event('volumeChange'));
    expect(component).toBeTruthy();
  });

  it('should pause', () => {
    component.player =  <HTMLAudioElement><unknown>audioStub;
    component.pause();
    expect(component).toBeTruthy();
  });

  it('should play', () => {
    component.player =  <HTMLAudioElement><unknown>audioStub;
    component.play();
    expect(component).toBeTruthy();
  });

});
