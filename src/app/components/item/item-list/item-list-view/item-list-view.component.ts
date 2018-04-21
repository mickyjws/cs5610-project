import {Component, OnInit} from '@angular/core';
import {ItemService} from '../../../../services/item.service.client';
import {Router} from '@angular/router';
import {SharedService} from '../../../../services/shared.service';
import {UserService} from '../../../../services/user.service.client';

@Component({
    selector: 'app-item-list-view',
    templateUrl: './item-list-view.component.html',
    styleUrls: ['./item-list-view.component.css']
})
export class ItemListViewComponent implements OnInit {

    items = [{}];
    userId: String;
    user: any;


    constructor(private itemService: ItemService, private sharedService: SharedService, private userService: UserService,
                private router: Router) {
    }

    ngOnInit() {
        this.user = this.sharedService.user;
        this.userId = this.user['_id'];
        this.itemService.findAllSellingItemsForUser(this.userId).subscribe(
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
