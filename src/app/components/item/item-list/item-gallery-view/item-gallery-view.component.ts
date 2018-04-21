import {Component, OnInit} from '@angular/core';
import {ItemService} from '../../../../services/item.service.client';

@Component({
    selector: 'app-item-gallery-view',
    templateUrl: './item-gallery-view.component.html',
    styleUrls: ['./item-gallery-view.component.css']
})
export class ItemGalleryViewComponent implements OnInit {

    items = [{}];

    constructor(private itemService: ItemService) {
    }

    ngOnInit() {
        this.itemService.findAllItems().subscribe(
            (items: any) => {
                this.items = items;
            }
        );
    }

}
