import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AssignmentReposComponent } from "./assignments.component";

describe("AssignmentReposComponent", () => {
  let component: AssignmentReposComponent;
  let fixture: ComponentFixture<AssignmentReposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignmentReposComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentReposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
