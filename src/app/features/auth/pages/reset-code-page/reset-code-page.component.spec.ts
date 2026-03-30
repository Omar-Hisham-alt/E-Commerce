import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetCodePageComponent } from './reset-code-page.component';

describe('ResetCodePageComponent', () => {
  let component: ResetCodePageComponent;
  let fixture: ComponentFixture<ResetCodePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetCodePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetCodePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
