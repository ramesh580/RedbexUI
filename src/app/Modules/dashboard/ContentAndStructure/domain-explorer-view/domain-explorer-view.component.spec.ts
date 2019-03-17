import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainExplorerViewComponent } from './domain-explorer-view.component';

describe('DomainExplorerViewComponent', () => {
  let component: DomainExplorerViewComponent;
  let fixture: ComponentFixture<DomainExplorerViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomainExplorerViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainExplorerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
