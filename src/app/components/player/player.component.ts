import { Component, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { AudioPlusComponent } from '../audio-plus/audio-plus.component';
import { PlayItem } from 'src/app/classes/play-item';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatSnackBar, MatDialog } from '@angular/material';
import { HelpComponent } from '../help/help.component';
import { Playlist } from 'src/app/classes/playlist';

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  animations: [
    trigger('faderOut', [
      state('start', style({
        opacity: 1
      })),
      state('fadeOut', style({
        opacity: 0
      })),
      state('ended', style({
        opacity: 0
      })),
      transition('start => fadeOut', animate('3000ms 1000ms')),
      transition('* => start', animate(1000))
    ])
  ]
})
export class PlayerComponent implements AfterViewInit {

  readonly PAUSE_TIME = 500;

  @ViewChild('audioPlayer', { read: AudioPlusComponent }) player: AudioPlusComponent;

  @Input() set playitems(value: PlayItem[]) {
    if (!value || value.length === 0) {
      return;
    }
    this.playlist.addItems(value);
    this.fadeState = 'start';
  }

  @Output() upload = new EventEmitter();

  wait = false;
  fadeState: string;
  playlist = new Playlist();
  
  private firstTime = true;

  constructor(private snackBar: MatSnackBar, public dialog: MatDialog) {}

  ngAfterViewInit() {
    // Start the next song when one has finished
    this.player.ended.subscribe(() => {
      this.playNext();
    });
  }

  // Changes the state for the drop message animation
  onFadeOutDone() {
    if (this.fadeState === 'start') {
      this.fadeState = 'fadeOut';
    } else if (this.fadeState === 'fadeOut') {
      this.fadeState = 'ended';
    }
  }

  openHelp() {
    this.dialog.open(HelpComponent, {
      width: '400px',
      panelClass: 'help-dialog'
    });
  }

  // Drag and drop within the playlist
  onDrop(event: CdkDragDrop<string[]>) {
    this.playlist.moveItem(event.previousIndex, event.currentIndex);
  }

  toggleShuffle() {
    this.playlist.isShuffle = !this.playlist.isShuffle;
    if (this.firstTime) {
      this.playlist.resetSelected();
    }
  }

  get loopTip() {
    return this.playlist.isLoop ? 'Looping is ON' : 'Looping is OFF';
  }

  get shuffleTip() {
    return this.playlist.isShuffle ? 'The list is shuffled' : 'The list is not shuffled';
  }

  // Remove a file and play the next one if possible
  remove(item: PlayItem) {
    if (this.playlist.selected === item) {
      this.onPause();
      if (this.playlist.canNext()) {
        this.playlist.moveNext();
        this.startPlay();
      }
    }
    this.playlist.remove(item);
  }

  onSelect(item: PlayItem) {
    this.onPause();
    this.playlist.selected = item;
    this.startPlay();
  }

  onPlayPause() {
    if (this.player.isPlaying) {
      this.onPause();
    } else {
      this.startPlay(0);
    }
  }

  onNext() {
    this.playlist.moveNext();
    this.startPlay();
  }

  onPrevious() {
    this.playlist.movePrev();
    this.startPlay();
  }

  onPause() {
    this.player.pause();
  }

  private playNext() {
    if (this.playlist.canNext()) {
      this.playlist.moveNext();
      this.startPlay(this.PAUSE_TIME);
    } else {
      this.playlist.resetSelected();
    }
  }
  
  private startPlay(pauseTime = this.PAUSE_TIME) {
    if (!this.playlist.selected) {
      return;
    }
    this.firstTime = false;
    this.wait = true;
    setTimeout(() => {
      this.wait = false;
      this.player.play().catch(err => {
        console.log(err);
        this.onError(this.playlist.selected);
      });
    }, pauseTime); // pause between files
  } 

  private onError(file: PlayItem) {
    const message = 'Error playing ' + file.name;
    this.snackBar.open(message, 'Error', { duration: 5000 });
    this.remove(this.playlist.selected);
  }

}
