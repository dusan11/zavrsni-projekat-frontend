import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinantialCardComponent } from './finantial-card.component';

describe('FinantialCardComponent', () => {
  let component: FinantialCardComponent;
  let fixture: ComponentFixture<FinantialCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinantialCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinantialCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
