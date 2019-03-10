import { Playlist } from './playlist';
import { PlayItem } from './play-item';

describe('Playlist', () => {
  let target: Playlist;
  let items: PlayItem[];

  beforeEach(() => {
    target = new Playlist();
    items = [
      new PlayItem('name1', 'type1', 'http://url1'),
      new PlayItem('name2', 'type2', 'http://url2'),
      new PlayItem('aname', 'type2', 'http://url3'),
      new PlayItem('aname', 'type2', 'http://url3')
    ];
  });

  it('should create an instance', () => {
    expect(target).toBeTruthy();
  });

  it('should shuffle', () => {
    target.addItems(items);
    target.isShuffle = true;
    expect(target.isShuffle).toEqual(true);
    (<any>target).originalItems = null;
    target.isShuffle = false;
    expect(target.isShuffle).toEqual(false);
  });

  it('should add items', () => {
    const list = [...items];
    target.addItems(null);
    target.addItems([]);
    target.addItems(list);
    target.selected = list[1];
    list.push(new PlayItem('name3', 'type3', 'http://url3'));
    target.addItems(list);
    expect(target.playItems.length).toEqual(list.length);
  });

  // it('should canNext', () => {
  //   target.addItems(items);
  //   target.selected = target.playItems[target.playItems.length - 1];
  //   target.isLoop = false;
  //   expect(target.canNext()).toBeFalsy();
  //   target.isLoop = true;
  //   expect(target.canNext()).toBeTruthy();
  // });

  // it('should canPrev', () => {
  //   target.addItems(items);
  //   target.selected = target.playItems[0];
  //   target.isLoop = false;
  //   expect(target.canPrev()).toBeFalsy();
  //   target.isLoop = true;
  //   expect(target.canPrev()).toBeTruthy();
  // });
  
  it('should moveNext', () => {
    target.addItems(items);
    target.isLoop = false;
    target.selected = target.playItems[0];
    target.moveNext();
    target.selected = target.playItems[target.playItems.length - 1];
    target.moveNext();

    target.isLoop = true;
    target.selected = target.playItems[0];
    target.moveNext();
    target.selected = target.playItems[target.playItems.length - 1];
    target.moveNext();
    target.playItems = [];
    target.moveNext();
    expect(target.canNext()).toBeTruthy();
  });
  
  it('should movePrev', () => {
    target.addItems(items);
    target.isLoop = false;
    target.selected = target.playItems[0];
    target.movePrev();
    target.selected = target.playItems[target.playItems.length - 1];
    target.movePrev();

    target.isLoop = true;
    target.selected = target.playItems[0];
    target.movePrev();
    target.selected = target.playItems[target.playItems.length - 1];
    target.movePrev();
    target.playItems = [];
    target.movePrev();
    expect(target.canNext()).toBeTruthy();
  });
  
  it('should remove', () => {
    target.addItems(items);
    target.selected = target.playItems[0];
    const len = target.playItems.length;
    target.remove(items[0]);
    expect(target.playItems.length).toEqual(len - 1);
  });
  
  it('should reset', () => {
    target.playItems = [];
    target.resetSelected();
    expect(target.selected).toBeNull();
    target.addItems(items);
    target.resetSelected();
    expect(target.selected).toEqual(target.playItems[0]);
  });
  
  it('should moveItem', () => {
    target.isShuffle = false;
    target.addItems(items);
    const item = target.playItems[0];
    target.moveItem(0, 1);
    expect(target.playItems[1]).toEqual(item);
  });
  
  it('should moveItem shuffled', () => {
    target.isShuffle = true;
    target.addItems(items);
    const item = target.playItems[0];
    target.moveItem(0, 1);
    expect(target.playItems[1]).toEqual(item);
  });

});
