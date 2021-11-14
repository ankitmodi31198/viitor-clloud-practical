import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGithubDataComponent } from './edit-github-data.component';

describe('EditGithubDataComponent', () => {
  let component: EditGithubDataComponent;
  let fixture: ComponentFixture<EditGithubDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditGithubDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGithubDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
