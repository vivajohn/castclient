import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioPlusComponent } from './audio-plus.component';

describe('AudioPlusComponent', () => {
  let component: AudioPlusComponent;
  let fixture: ComponentFixture<AudioPlusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioPlusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioPlusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
