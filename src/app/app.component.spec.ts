import { TestBed, async, ComponentFixture, tick, fakeAsync, flushMicrotasks } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PlayerComponent } from './components/player/player.component';
import { AudioPlusComponent } from './components/audio-plus/audio-plus.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { last, delay } from 'rxjs/operators';
import 'hammerjs';
import { ResolveEnd } from '@angular/router';

class FakeFileList {
  private static makeFile(data: any, type: string, name: string): File {
    const blob = new Blob([data], { type: type });
    blob["name"] = name;
    return blob as File;
  }

  private static files = [
    FakeFileList.makeFile("", "audio/mp3", "file1"),
    FakeFileList.makeFile("abcdefgnhijk", "audio/mpegurl", "file2"),
    FakeFileList.makeFile("", "audio/mpegurl", "file3"),  // Invalid content: should not be added to list
    FakeFileList.makeFile("", "audio/mpegurl", "file4")   // Invalid content: should not be added to list
  ];

  static make(num: number): FileList {
    const obj = {};
    for(let i = 0; i < num; i++) {
      obj[i] = FakeFileList.files[i];
    }
    obj['length'] = num;
    obj['item'] = (index: number) => FakeFileList.files[index];
    return obj as FileList;
  }

}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NoopAnimationsModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        MatSliderModule,
        MatSnackBarModule,
        MatDialogModule
      ],
      declarations: [
        AppComponent,
        PlayerComponent,
        AudioPlusComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;

  }));

  it('should process dropped file list 1', done => {
    let spy = spyOn<any>(component, 'createPlayItems').and.callThrough();
    component.dropped(FakeFileList.make(1));
    spy.calls.mostRecent().returnValue.pipe(last()).subscribe(result => {
      fixture.detectChanges();
      expect(component.playItems.length).toEqual(1);
      done();
    });
  });

  it('should process dropped file list 3', done => {
    let spy = spyOn<any>(component, 'createPlayItems').and.callThrough();
    component.dropped(FakeFileList.make(3));
    spy.calls.mostRecent().returnValue.pipe(last()).subscribe(result => {
      fixture.detectChanges();
      expect(component.playItems.length).toEqual(2);
      done();
    });
  });

  it('should process uploaded file list', done => {
    let spy = spyOn<any>(component, 'createPlayItems').and.callThrough();
    component.upload(FakeFileList.make(3));
    spy.calls.mostRecent().returnValue.pipe(last()).subscribe(result => {
      fixture.detectChanges();
      expect(component.playItems.length).toEqual(2);
      done();
    });
  });

  it('should drop with multiple errors', done => {
    let spy = spyOn<any>(component, 'createPlayItems').and.callThrough();
    component.dropped(FakeFileList.make(4));
    spy.calls.mostRecent().returnValue.pipe(last()).subscribe(result => {
      fixture.detectChanges();
      expect(component.playItems.length).toEqual(2);
      done();
    });
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have playItems', () => {
    component.playItems = [];
    expect(component.playItems).not.toBeNull();
  });

  it('should isFileHover be true', () => {
    component.isFileHover = true;
    expect(component.isFileHover).toBeTruthy();
  });

});
