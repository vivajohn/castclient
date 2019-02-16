import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpComponent } from './help.component';
import { MatIconModule, MatButtonModule, MatProgressSpinnerModule, MatTooltipModule, 
  MatSliderModule, MatSnackBarModule, MatDialogModule } from '@angular/material';
import { MatDialogRef } from '@angular/material/dialog';

describe('HelpComponent', () => {
  let component: HelpComponent;
  let fixture: ComponentFixture<HelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpComponent ],
      imports: [
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        MatSliderModule,
        MatSnackBarModule,
        MatDialogModule
      ],
      providers: [{provide : MatDialogRef, useValue : {}}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
