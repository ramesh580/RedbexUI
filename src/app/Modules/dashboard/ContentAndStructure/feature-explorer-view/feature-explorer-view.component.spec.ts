import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureExplorerViewComponent } from './feature-explorer-view.component';

describe('FeatureExplorerViewComponent', () => {
  let component: FeatureExplorerViewComponent;
  let fixture: ComponentFixture<FeatureExplorerViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureExplorerViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureExplorerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
