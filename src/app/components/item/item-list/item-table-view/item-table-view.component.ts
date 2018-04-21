import {Component, OnInit} from '@angular/core';
import {ItemService} from '../../../../services/item.service.client';
import {Router} from '@angular/router';
import {UserService} from '../../../../services/user.service.client';

@Component({
    selector: 'app-item-table-view',
    templateUrl: './item-table-view.component.html',
    styleUrls: ['./item-table-view.component.css']
})
export class ItemTableViewComponent implements OnInit {

    items = [{}];

    constructor(private itemService: ItemService, private userService: UserService, private router: Router) {
    }

    ngOnInit() {
        this.itemService.findAllItems().subscribe(
            (items: any) => {
                this.items = items;
            }
        );
    }

    deleteItem(itemId: String) {
        this.itemService.deleteItem(itemId)
            .subscribe(
                (res: any) => {
                    window.location.reload();
                }
            );
    }

    logout() {
        this.userService.logout()
            .subscribe(
                (data: any) => this.router.navigate(['/'])
            );
    }

}
