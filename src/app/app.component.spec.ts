import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture: any = TestBed.createComponent(AppComponent);
    const app: any = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'asicde-frontend'`, () => {
    const fixture: any = TestBed.createComponent(AppComponent);
    const app: any = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('asicde-frontend');
  });

  it('should render title', () => {
    const fixture: any = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled: any = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.mutable_content span').textContent)
      .toContain('asicde-frontend app is running!');
  });
});
