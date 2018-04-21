import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-profile-buyer',
    templateUrl: './profile-buyer.component.html',
    styleUrls: ['./profile-buyer.component.css', '../profile.component.css']
})
export class ProfileBuyerComponent implements OnInit {

    @Input()
    user: any;

    constructor() {
    }

    ngOnInit() {
    }

}
