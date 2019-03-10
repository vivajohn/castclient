import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { PlayerComponent } from './player.component';
import { MatIconModule, MatButtonModule, MatProgressSpinnerModule, MatTooltipModule, 
  MatSliderModule, MatSnackBarModule, MatDialogModule, MatDialog } from '@angular/material';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';
import { AudioPlusComponent } from '../audio-plus/audio-plus.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlayItem } from 'src/app/classes/play-item';
import 'hammerjs';
import { Playlist } from 'src/app/classes/playlist';
import { Subject } from 'rxjs';

describe('PlayerComponent', () => {
  let component: PlayerComponent;
  let fixture: ComponentFixture<PlayerComponent>;

  const makeList = (): Playlist => {
    const playlist: Playlist = new Playlist();
    playlist.addItems([
      new PlayItem('name1', 'type1', 'http://url1'),
      new PlayItem('name2', 'type2', 'http://url2')
    ]);
    playlist.selected = playlist.playItems[0];
    return playlist;
  };

  const dlgStub = {
    open: (a: any, b: any) => {}
  };

  const audioStub = <AudioPlusComponent><unknown>{
    ended: new Subject<any>(),
    play: (): Promise<any> => {
      component.player.isPlaying = true;
      return Promise.resolve(true);
    },
    pause: (): Promise<any> => {
      component.player.isPlaying = false;
      return Promise.resolve(true);
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerComponent, AudioPlusComponent ],
      imports: [
        BrowserAnimationsModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        MatSliderModule,
        DragDropModule,
        MatSnackBarModule,
        MatDialogModule
      ],
      providers: [
        { provide: MatDialog, useValue: dlgStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.playlist = makeList();
    component.player = audioStub;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should onDrop', () => {
    expect(component.playlist.playItems[0].name).toEqual('name1');
    component.onDrop({ previousIndex: 0, currentIndex: 1 } as CdkDragDrop<string[], string[]>);
    expect(component.playlist.playItems[1].name).toEqual('name1');
  });

  it('should set items', () => {
    const start = component.playlist.playItems
    component.playitems = null;
    component.playitems = [];
    component.playitems = start;
    expect(component.playlist.playItems).toEqual(start);
  });

  it('should error', () => {
    const item = component.playlist.playItems[0];
    (component as any).onError(item);
    expect(component.playlist.playItems.includes(item)).toBeFalsy();

  });

  it('should not play', () => {
    component.playlist.selected = null;
    (component as any).startPlay();
    expect(component.player.isPlaying).toBeFalsy();
  });

  it('should onFadeOutDone', () => {
    component.fadeState = 'start';
    component.onFadeOutDone();
    expect(component.fadeState).toEqual('fadeOut');
    component.onFadeOutDone();
    expect(component.fadeState).toEqual('ended');
  });

  it('should onNext', fakeAsync(() => {
    component.onNext();
    tick(component.PAUSE_TIME + 100);
    expect(component).toBeTruthy();
  }));

  it('should onPause', fakeAsync(() => {
    component.onPause();
    tick(component.PAUSE_TIME + 100);
    expect(component.playlist.selected).toBeTruthy();
  }));

  it('should onPlayPause', fakeAsync(() => {
    component.player.isPlaying = false;
    component.onPlayPause();
    tick(component.PAUSE_TIME + 100);
    expect(component.player.isPlaying).toBeTruthy();
    component.player.isPlaying = true;
    component.onPlayPause();
    tick(component.PAUSE_TIME + 100);
    expect(component.player.isPlaying).toBeFalsy();
  }));

  it('should onPrevious', fakeAsync(() => {
    component.onPrevious();
    tick(component.PAUSE_TIME + 100);
    expect(component.playlist.selected).toBeTruthy();
  }));

  it('should onSelect', fakeAsync(() => {
    const item = component.playlist.playItems[0];
    component.onSelect(item);
    tick(component.PAUSE_TIME + 100);
    expect(component.playlist.selected).toEqual(item);
    component.onSelect(null);
    expect(component.playlist.selected).toBeNull();
  }));

  it('should openHelp', () => {
    component.openHelp();
    expect(component).toBeTruthy();
  });

  it('should remove', fakeAsync(() => {
    let item = component.playlist.playItems[0];
    component.playlist.selected = null;
    component.remove(item);
    tick(component.PAUSE_TIME + 100);

    component.playlist = makeList();
    item = component.playlist.playItems[0];
    component.onSelect(item);
    tick(component.PAUSE_TIME + 100);
    component.remove(item);
    tick(component.PAUSE_TIME + 100);

    component.playlist = makeList();
    component.playlist.isLoop = false;
    item = component.playlist.playItems[component.playlist.playItems.length - 1];
    component.onSelect(item);
    tick(component.PAUSE_TIME + 100);
    component.remove(item);
    tick(component.PAUSE_TIME + 100);

    expect(component.playlist.playItems.includes(item)).toBeFalsy();
  }));

  it('should toggleShuffle', () => {
    component.toggleShuffle();
    const c = component as any;
    c.firstTime = !c.firstTime;
    const b = component.playlist.isShuffle;
    component.toggleShuffle();
    expect(component.playlist.isShuffle).not.toEqual(b);
  });

  it('should tooltips', () => {
    let tip = component.loopTip;
    component.playlist.isLoop = !component.playlist.isLoop;
    tip = component.shuffleTip;
    component.playlist.isShuffle = !component.playlist.isShuffle;
    tip = component.shuffleTip;
    expect(tip).toBeTruthy();
  });

  it('should play next', fakeAsync(() => {
    component.ngAfterViewInit();
    audioStub.ended.next();
    tick(component.PAUSE_TIME + 100);

    component.playlist.isLoop = false;
    const item = component.playlist.playItems[component.playlist.playItems.length - 1];
    component.onSelect(item);
    audioStub.ended.next();
    audioStub.ended.complete();
    tick(component.PAUSE_TIME + 100);

    expect(component.player.isPlaying).toBeTruthy();
  }));

});
