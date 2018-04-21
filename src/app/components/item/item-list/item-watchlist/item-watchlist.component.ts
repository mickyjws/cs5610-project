import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../services/user.service.client';
import {ItemService} from '../../../../services/item.service.client';
import {Router} from '@angular/router';
import {SharedService} from '../../../../services/shared.service';

@Component({
    selector: 'app-item-watchlist',
    templateUrl: './item-watchlist.component.html',
    styleUrls: ['./item-watchlist.component.css']
})
export class ItemWatchlistComponent implements OnInit {

    items = [{}];
    userId: String;
    user: any;

    constructor(private itemService: ItemService,
                private userService: UserService,
                private sharedService: SharedService,
                private router: Router) {
    }

    ngOnInit() {
        this.user = this.sharedService.user;
        this.userId = this.user['_id'];
        this.userService.findWatchListForUser(this.userId).subscribe(
            (user: any) => {
                this.items = user.watchList;
            }
        );
    }

    removeFromWatchList(itemId: String) {
        this.userService.removeItemFromWatchList(this.userId, itemId).subscribe(
            (re: any) => {
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
