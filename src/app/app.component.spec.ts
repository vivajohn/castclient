import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatIconModule, MatButtonModule, MatProgressSpinnerModule, MatTooltipModule, 
  MatSliderModule, MatSnackBarModule, MatDialogModule } from '@angular/material';
import { PlayerComponent } from './components/player/player.component';
import { AudioPlusComponent } from './components/audio-plus/audio-plus.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
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
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
