import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCaseComponent } from './post-case.component';

describe('PostCaseComponent', () => {
  let component: PostCaseComponent;
  let fixture: ComponentFixture<PostCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostCaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
