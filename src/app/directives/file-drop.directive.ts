import { Directive, EventEmitter, Output, HostListener } from '@angular/core';

// source: https://angularfirebase.com/lessons/drag-and-drop-file-uploads-to-firebase-storage/

@Directive({
  selector: '[fileDrop]'
})
export class FileDropDirective {

  @Output() filesDropped =  new EventEmitter<FileList>();
  @Output() filesHovered =  new EventEmitter<boolean>();

  constructor() { }

  @HostListener('drop', ['$event'])
  onDrop($event) {
    $event.preventDefault();
    this.filesDropped.emit($event.dataTransfer.files);
    this.filesHovered.emit(false);
  }

  @HostListener('dragover', ['$event'])
  onDragOver($event) {
    $event.preventDefault();
    this.filesHovered.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave($event) {
    this.filesHovered.emit(false);
  }
}
