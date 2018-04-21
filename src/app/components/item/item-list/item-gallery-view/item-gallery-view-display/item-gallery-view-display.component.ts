import {Component, OnInit} from '@angular/core';
import {ItemService} from '../../../../../services/item.service.client';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-item-gallery-view-display',
    templateUrl: './item-gallery-view-display.component.html',
    styleUrls: ['./item-gallery-view-display.component.css', '../item-gallery-view.component.css']
})
export class ItemGalleryViewDisplayComponent implements OnInit {

    items = [{}];
    link: String;

    constructor(private itemService: ItemService, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.activatedRoute.url.subscribe(url => {
            if (url[0].path === 'user') {
                this.link = '/user/item';
            } else {
                this.link = '/item';
            }

            this.itemService.findAllItems().subscribe(
                (items: any) => {
                    this.items = items;
                }
            );
        });

    }

}
