import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemTableViewComponent} from './item-table-view.component';

describe('ItemTableViewComponent', () => {
    let component: ItemTableViewComponent;
    let fixture: ComponentFixture<ItemTableViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemTableViewComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemTableViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
