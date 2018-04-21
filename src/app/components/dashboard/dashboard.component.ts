import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service.client';
import {Router} from '@angular/router';
import {SharedService} from '../../services/shared.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    user: any;
    type: String;

    constructor(private router: Router,
                private userService: UserService,
                private sharedService: SharedService) {
    }

    ngOnInit() {
        this.user = this.sharedService.user;
        this.type = this.user.type;
    }

    logout() {
        this.userService.logout()
            .subscribe(
                (data: any) => this.router.navigate(['/'])
            );
    }

}
