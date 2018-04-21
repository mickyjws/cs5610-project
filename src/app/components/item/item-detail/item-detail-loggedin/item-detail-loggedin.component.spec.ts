import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemDetailLoggedinComponent} from './item-detail-loggedin.component';

describe('ItemDetailLoggedinComponent', () => {
    let component: ItemDetailLoggedinComponent;
    let fixture: ComponentFixture<ItemDetailLoggedinComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemDetailLoggedinComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemDetailLoggedinComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
