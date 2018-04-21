import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemGalleryViewComponent} from './item-gallery-view.component';

describe('ItemGalleryViewComponent', () => {
    let component: ItemGalleryViewComponent;
    let fixture: ComponentFixture<ItemGalleryViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemGalleryViewComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemGalleryViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
