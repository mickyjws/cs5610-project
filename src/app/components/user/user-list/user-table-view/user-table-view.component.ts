import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../../../services/user.service.client';

@Component({
    selector: 'app-user-table-view',
    templateUrl: './user-table-view.component.html',
    styleUrls: ['./user-table-view.component.css']
})
export class UserTableViewComponent implements OnInit {

    users = [{}];

    constructor(private userService: UserService, private router: Router) {
    }

    ngOnInit() {
        this.userService.findAllUsers().subscribe(
            (users: any) => {
                this.users = users;
            }
        );
    }

    deleteUser(userId: String) {
        this.userService.deleteUser(userId)
            .subscribe(
                (res: any) => {
                    window.location.reload();
                }
            );
    }
}
