import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-profile-seller',
    templateUrl: './profile-seller.component.html',
    styleUrls: ['./profile-seller.component.css']
})
export class ProfileSellerComponent implements OnInit {

    @Input()
    user: any;

    constructor() {
    }

    ngOnInit() {
    }

}
