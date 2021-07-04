import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

// Useful info:
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement#Properties
// https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events

@Component({
  selector: 'audio-plus',
  templateUrl: './audio-plus.component.html',
  styleUrls: ['./audio-plus.component.scss']
})
export class AudioPlusComponent implements OnInit {

  @ViewChild('audioPlayer', { static: true }) audioElement: ElementRef;

  @Input() set src(url: string) {
    // Do not use null because audio element makes a bad http request if its src is null
    this.source = url ? this.domSanitizer.bypassSecurityTrustUrl(url) : '';
  }
  @Input() set volume(value: number) {
    if (this.player) {
      this.player.volume = value / 100;
    }
  }
  get volume(): number {
    return !this.player ? 0 : this.player.volume * 100;
  }

  @Output() playing = new EventEmitter();
  @Output() ended = new EventEmitter();
  @Output() volumeChange = new EventEmitter();

  player: HTMLAudioElement;
  isPlaying = false;
  isPaused = false;
  isEnded = true;
  source: SafeUrl;

  constructor(private domSanitizer: DomSanitizer, private zone: NgZone) { }

  ngOnInit() {
    this.player = this.audioElement.nativeElement;
    this.player.volume = 0.6;

    this.player.addEventListener('ended', () => {
      this.zone.run(() => {
        this.setFlags(false, false, true);
        this.ended.emit();
      });
    });

    this.player.addEventListener('play', () => {
      this.zone.run(() => {
        this.setFlags(true, false, false);
        this.playing.emit();
      });
    });

    this.player.addEventListener('pause', () => {
      this.zone.run(() => {
        this.setFlags(false, true, false);
        this.playing.emit();
      });
    });

    this.player.addEventListener('volumechange', () => {
      this.zone.run(() => {
        this.volumeChange.emit(this.player.volume * 100);
      });
    });
  }

  play(): Promise<void> {
    // On Chrome, this can return null
    return this.player.play();
  }

  pause() {
    this.player.pause();
  }

  private setFlags(play: boolean, pause: boolean, ended: boolean) {
    this.isPlaying = play;
    this.isPaused = pause;
    this.isEnded = ended;
  }

}
