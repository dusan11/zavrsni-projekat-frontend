import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsNewComponent } from './transactions-new.component';

describe('TransactionsNewComponent', () => {
  let component: TransactionsNewComponent;
  let fixture: ComponentFixture<TransactionsNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionsNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
