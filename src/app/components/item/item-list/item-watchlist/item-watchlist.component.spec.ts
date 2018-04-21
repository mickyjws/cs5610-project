import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemWatchlistComponent} from './item-watchlist.component';

describe('ItemWatchlistComponent', () => {
    let component: ItemWatchlistComponent;
    let fixture: ComponentFixture<ItemWatchlistComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemWatchlistComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemWatchlistComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
