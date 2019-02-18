import { PlayItem } from './play-item';

// Manages a list of audio urls. 
// Contains operations for moving through the list as they are played.
export class Playlist {
  
  private originalItems: PlayItem[] = [];

  private _isShuffle = false;
  get isShuffle(): boolean {
    return this._isShuffle;
  }
  set isShuffle(value: boolean) {
    this._isShuffle = value;
    this.setPlaylist();
  }

  playItems: PlayItem[];
  selected: PlayItem;
  isLoop = true;

  addItems(items: PlayItem[]) {
    if (!items || items.length === 0) {
      return;
    }

    // Do not include duplicate files
    const names = this.originalItems.map(x => x.name);
    items.forEach(x => {
      if (!names.includes(x.name)) {
        this.originalItems.push(x);
      }
    });
    this.originalItems.sort((itemA, itemB) => {
      const a = itemA.name.toUpperCase();
      const b = itemB.name.toUpperCase();
      return (a < b) ? -1 : (a > b) ? 1 : 0;
    });

    this.setPlaylist();

    if (!this.selected) {
      this.resetSelected();
    }
  }

  canNext(): boolean {
    return this.isLoop ? true : this.currentIndex < this.playItems.length;
  }

  canPrev(): boolean {
    return this.isLoop ? true : this.currentIndex > 0;
  }

  moveNext() {
    if (this.canNext()) {
      this.move(1);
    }
  }

  movePrev() {
    if (this.canPrev()) {
      this.move(-1);
    }
  }

  remove(file: PlayItem) {
    this.originalItems.splice(this.originalItems.indexOf(file), 1);
    const i = this.playItems.indexOf(file);
    this.playItems = [...this.playItems.slice(0, i), ...this.playItems.slice(i + 1)];
  }

  resetSelected() {
    this.selected = this.playItems.length === 0 ? null : this.playItems[0];
  }

  moveItem(iFrom: number, iTo: number) {
    this.moveItemInArray(this.playItems, iFrom, iTo);
    if (!this.isShuffle) {
      this.moveItemInArray(this.originalItems, iFrom, iTo);
    }
  }

  private moveItemInArray(array: any[], iFrom: number, iTo: number) {
    const item = array[iFrom];
    array.splice(iFrom, 1);
    array.splice(iTo, 0, item);
  }

  private get currentIndex(): number {
    return this.playItems.indexOf(this.selected);
  }

  private move(delta: number) {
    if (this.playItems.length === 0) {
      this.selected = null;
      return;
    }
    const i = (this.originalItems.length + this.currentIndex + delta) % this.originalItems.length;
    this.selected = this.playItems[i];
  }
    
  private setPlaylist() {
    this.playItems = !this.originalItems ? [] : [...this.originalItems];

    if (this.isShuffle) {
      this.shuffle();
    }
  }

  private shuffle() {
    let i = this.originalItems.length;
    let temp;
    let iRandom;

    // While there remain elements to shuffle...
    while (0 !== i) {
  
      // Pick a remaining element...
      iRandom = Math.floor(Math.random() * i);
      i -= 1;
  
      // And swap it with the current element.
      temp = this.playItems[i];
      this.playItems[i] = this.playItems[iRandom];
      this.playItems[iRandom] = temp;
    }
  }

}
