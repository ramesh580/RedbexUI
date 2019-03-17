import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExplorerViewComponent } from './view-explorer-view.component';

describe('ViewExplorerViewComponent', () => {
  let component: ViewExplorerViewComponent;
  let fixture: ComponentFixture<ViewExplorerViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewExplorerViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewExplorerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
