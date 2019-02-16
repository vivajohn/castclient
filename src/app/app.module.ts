import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MatIconModule, MatButtonModule, MatProgressSpinnerModule, 
  MatTooltipModule, MatSliderModule, MatSnackBarModule, MatDialogModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FileDropDirective } from './directives/file-drop.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlayerComponent } from './components/player/player.component';
import { AudioPlusComponent } from './components/audio-plus/audio-plus.component';
import { HelpComponent } from './components/help/help.component';

@NgModule({
  declarations: [
    AppComponent,
    FileDropDirective,
    PlayerComponent,
    AudioPlusComponent,
    HelpComponent
  ],
  imports: [
    BrowserModule,
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
  providers: [],
  entryComponents: [
    HelpComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
