import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemDetailGuestComponent} from './item-detail-guest.component';

describe('ItemDetailGuestComponent', () => {
    let component: ItemDetailGuestComponent;
    let fixture: ComponentFixture<ItemDetailGuestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemDetailGuestComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemDetailGuestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
