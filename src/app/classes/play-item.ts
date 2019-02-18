export class PlayItem {
  private static _id = 1;

  id: number;
  name: string;
  // name: string;
  type: string;
  url: string;

  constructor(name: string, type: string, url: string) {
    this.id = PlayItem._id;
    PlayItem._id++;
    
    this.name = name;
    this.type = type;
    this.url = url;
  }
}
