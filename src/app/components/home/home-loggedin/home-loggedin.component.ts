import {Component, OnInit} from '@angular/core';
import {ItemService} from '../../../services/item.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../../../services/shared.service';
import {UserService} from '../../../services/user.service.client';

@Component({
    selector: 'app-home-loggedin',
    templateUrl: './home-loggedin.component.html',
    styleUrls: ['./home-loggedin.component.css']
})
export class HomeLoggedinComponent implements OnInit {

    items = [{}];
    user: any;
    username: String;
    userId: String;

    constructor(private router: Router,
                private userService: UserService,
                private itemService: ItemService,
                private sharedService: SharedService,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.user = this.sharedService.user;
        this.username = this.user.username;
        this.itemService.findLatestSixItems().subscribe(
            (items: any) => {
                this.items = items;
            }
        );
    }

    logout() {
        this.userService.logout()
            .subscribe(
                (data: any) => this.router.navigate(['/home'])
            );
    }

}
