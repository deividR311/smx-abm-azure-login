import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { ManagementComponent } from './management.component';

describe('ManagementComponent', () => {
  let component: ManagementComponent;
  let fixture: ComponentFixture<ManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(),],
      declarations: [ManagementComponent],
      providers: [
        TranslateService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


   /**
     * 
     * @returs {*}
     * @membersof ManagementComponent
     * @author Daniel Rodriguez
     */
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
