import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SharedService} from '../../../services/shared.service';

@Component({
    selector: 'app-dashboard-admin',
    templateUrl: './dashboard-admin.component.html',
    styleUrls: ['./dashboard-admin.component.css', '../dashboard.component.css']
})
export class DashboardAdminComponent implements OnInit {

    user: any;

    constructor(private router: Router,
                private sharedService: SharedService) {
    }

    ngOnInit() {
        this.user = this.sharedService.user;
    }

}
