import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemGalleryViewDisplayComponent} from './item-gallery-view-display.component';

describe('ItemGalleryViewDisplayComponent', () => {
    let component: ItemGalleryViewDisplayComponent;
    let fixture: ComponentFixture<ItemGalleryViewDisplayComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemGalleryViewDisplayComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemGalleryViewDisplayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
