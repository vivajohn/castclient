import { Component, ViewChild, ElementRef} from '@angular/core';
import { PlayItem } from './classes/play-item';
import { Observable, Subject, of, interval, merge } from 'rxjs';
import { map, mapTo, last, filter, catchError, onErrorResumeNext } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('dropTarget', { static: true }) dropTarget: ElementRef;
  
  playItems: PlayItem[];
  isFileHover = false;

  constructor(private snackBar: MatSnackBar) {}

  upload(files: FileList) {
    this.makePlayList(files);
  }

  dropped(files: FileList) {
    this.makePlayList(files);
  }
  
  private makePlayList(files: FileList) {
    const errors: PlayItem[] = [];
    const items: PlayItem[] = [];
    this.createPlayItems(files).subscribe(item => {
      if (item.url) {
        items.push(item);
      } else {
        errors.push(item);
      }
    }, err => {
      console.log('Playlist error: ', err);
    }, () => {
      this.playItems = items;
      if (errors.length > 0) {
        const message =  errors.length > 1 ? 'Errors reading multiple files' : 'Error reading ' + errors[0].name;
        this.snackBar.open(message, 'Error', { duration: 3000 });
      }
    });
  }

  private createPlayItems(files: FileList): Observable<PlayItem> {
    const obsList: Observable<PlayItem>[] = [];
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.startsWith('audio/')) {
        obsList.push(this.makePlayItem(files[i]));
      } 
    }
    return merge(...obsList);
  }

  private makePlayItem(file: File): Observable<PlayItem> {
    if (file.name.includes('.m3u') || file.type === 'audio/mpegurl') {
      const s = new Subject<PlayItem>();
      this.m3uToUrl(file).subscribe(url => {
        s.next(new PlayItem(file.name, file.type, url));
        s.complete();
      });
      return s;
    }
    return of(new PlayItem(file.name, file.type, URL.createObjectURL(file)));
  }

  private m3uToUrl(file: File): Observable<string> {
    const s = new Subject<string>();
    const reader = new FileReader();
    reader.onload = (e: any) => {
      let result = null;
      const lines: string[] = e.target.result.split(/\r?\n/g);
      if (lines.length > 0) {
        result = lines[0].trim();
      }
      s.next(result);
      s.complete();
    };
    reader.readAsText(file);
    return s;
  }

}
