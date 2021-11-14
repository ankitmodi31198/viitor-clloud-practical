import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewGithubDataComponent } from './preview-github-data.component';

describe('PreviewGithubDataComponent', () => {
  let component: PreviewGithubDataComponent;
  let fixture: ComponentFixture<PreviewGithubDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewGithubDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewGithubDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
