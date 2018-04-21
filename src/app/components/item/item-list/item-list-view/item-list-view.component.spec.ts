import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemListViewComponent} from './item-list-view.component';

describe('ItemListViewComponent', () => {
    let component: ItemListViewComponent;
    let fixture: ComponentFixture<ItemListViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemListViewComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemListViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
