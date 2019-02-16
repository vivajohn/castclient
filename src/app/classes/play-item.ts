export class PlayItem {
  name: string;
  type: string;
  url: string;

  constructor(name: string, type: string, url?: string) {
    this.name = name;
    this.type = type;
    this.url = url;
  }
}
