import {Component, OnInit} from '@angular/core';
import {ItemService} from '../../../../services/item.service.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-item-detail-guest',
    templateUrl: './item-detail-guest.component.html',
    styleUrls: ['./item-detail-guest.component.css']
})
export class ItemDetailGuestComponent implements OnInit {

    itemId: String;
    userId: String;
    item: any;
    seller: any;

    condition: String;

    constructor(private itemService: ItemService,
                private activatedRoute: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(
            (params: any) => {
                this.itemId = params['itemId'];
                this.itemService.findItemById(this.itemId).subscribe(
                    (item: any) => {
                        this.item = item;
                        this.seller = this.item._seller;

                        if (item.is_new) {
                            this.condition = 'New';
                        } else {
                            this.condition = 'Used';
                        }
                    }
                );
            }
        );

    }

}
