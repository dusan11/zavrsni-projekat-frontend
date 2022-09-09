import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsOrderComponent } from './transactions-order.component';

describe('TransactionsOrderComponent', () => {
  let component: TransactionsOrderComponent;
  let fixture: ComponentFixture<TransactionsOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionsOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionsOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
