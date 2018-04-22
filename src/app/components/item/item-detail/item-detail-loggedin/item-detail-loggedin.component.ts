import {Component, OnInit} from '@angular/core';
import {ItemService} from '../../../../services/item.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../../../../services/shared.service';
import {UserService} from '../../../../services/user.service.client';

import {} from '@types/googlemaps';
declare var google: any;

@Component({
    selector: 'app-item-detail-loggedin',
    templateUrl: './item-detail-loggedin.component.html',
    styleUrls: ['./item-detail-loggedin.component.css']
})
export class ItemDetailLoggedinComponent implements OnInit {

    itemId: String;
    userId: String;
    item: any;
    user: any;
    seller: any;

    itemPostedDate: any;
    userCreatedDate: any;

    condition: String;
    is_buyer: Boolean;
    is_watched: Boolean;
    googleMap: google.maps.Map;

    constructor(private sharedService: SharedService,
                private userService: UserService,
                private itemService: ItemService,
                private activatedRoute: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        this.user = this.sharedService.user;
        this.userId = this.user._id;
        this.is_buyer = (this.user.type === 'BUYER');

        this.activatedRoute.params.subscribe(
            (params: any) => {
                this.itemId = params['itemId'];
                this.itemService.findItemById(this.itemId).subscribe(
                    (item: any) => {
                        this.item = item;
                        this.seller = this.item._seller;
                        this.is_watched = this.user.watchList.includes(this.itemId);
                        this.itemPostedDate = new Date(this.item.dateCreated).toUTCString();
                        this.userCreatedDate = new Date(this.seller.dateCreated).toDateString();

                        if (item.is_new) {
                            this.condition = 'New';
                        } else {
                            this.condition = 'Used';
                        }

                        this.loadGoogleMap();
                    }
                );
            }
        );
    }

    loadGoogleMap() {
        const geocoder = new google.maps.Geocoder();
        const address = this.seller.address + ', ' + this.seller.city + ', ' + this.seller.state + ' ' + this.seller.zip;

        geocoder.geocode({'address': address}, function (results, status) {
            if (status === 'OK') {
                const mapOption = {
                    center: results[0].geometry.location,
                    zoom: 12,
                };
                this.googleMap = new google.maps.Map(document.getElementById('map'), mapOption);
                const marker = new google.maps.Marker({
                    map: this.googleMap,
                    position: results[0].geometry.location
                });
            } else {
                console.log('Geocode was not successful for the following reason: ' + status);
            }
        });
    }

    addToWatchList() {
        this.userService.addItemToWatchList(this.userId, this.itemId).subscribe(
            (re: any) => {
                // this.router.navigate(['/user', 'item', this.itemId, 'detail?refresh=1']);
                window.location.reload();
            }
        );
    }

    removeFromWatchList() {
        this.userService.removeItemFromWatchList(this.userId, this.itemId).subscribe(
            (re: any) => {
                // this.router.navigate(['/user', 'item', this.itemId, 'detail?refresh=1']);
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
