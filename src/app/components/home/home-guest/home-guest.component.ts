import {Component, OnInit} from '@angular/core';
import {ItemService} from '../../../services/item.service.client';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-home-guest',
    templateUrl: './home-guest.component.html',
    styleUrls: ['./home-guest.component.css']
})
export class HomeGuestComponent implements OnInit {

    items = [{}];

    constructor(private itemService: ItemService,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.itemService.findLatestSixItems().subscribe(
            (items: any) => {
                this.items = items;
            }
        );
    }

}
