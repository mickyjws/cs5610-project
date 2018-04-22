import {Component, OnInit, ViewChild} from '@angular/core';
import {ItemService} from '../../../services/item.service.client';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {SharedService} from '../../../services/shared.service';

@Component({
    selector: 'app-item-edit',
    templateUrl: './item-edit.component.html',
    styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {

    @ViewChild('f') submitForm: NgForm;

    category: String;
    name: String;
    price: Number;
    url: String;
    title: String;
    description: String;
    is_new: Boolean;

    user: any;
    item: any;
    userId: String;
    itemId: String;
    valid = false;

    errorFlag: boolean;
    errorMsg = 'Please fill in all the required fields!';

    baseUrl: String;

    constructor(private itemService: ItemService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private sharedService: SharedService) {
        this.baseUrl = environment.baseUrl;
    }

    ngOnInit() {
        this.user = this.sharedService.user;
        this.userId = this.user['_id'];
        this.activatedRoute.params
            .subscribe(
                (params: any) => {
                    this.itemId = params['itemId'];
                    this.itemService.findItemById(this.itemId).subscribe((item: any) => {
                        this.item = item;
                        this.name = item.name;
                        this.category = item.category;
                        this.price = item.price;

                        if (item.url === 'https://www.happyceliac.com/wp-content/uploads/2018/02/placeholder-image.png') {
                            this.url = '';
                        } else {
                            this.url = item.url;
                        }


                        this.title = item.title;
                        this.description = item.description;
                        this.is_new = item.is_new;
                    });
                }
            );
    }

    updateItem() {
        this.valid = this.submitForm.valid;

        if (this.submitForm.value.category === '') {
            this.errorMsg = 'Item category is required';
            this.errorFlag = true;
            return;
        }

        if (this.valid) {
            this.name = this.submitForm.value.name;
            this.category = this.submitForm.value.category;
            this.price = this.submitForm.value.price;
            this.url = this.submitForm.value.url;

            this.title = this.submitForm.value.title;
            this.description = this.submitForm.value.description;
            this.is_new = this.submitForm.value.is_new;

            this.item.category = this.category;
            this.item.name = this.name;
            this.item.price = this.price;

            if (this.url !== '') {
                this.item.url = this.url;
            }

            this.item.title = this.title;
            this.item.description = this.description;
            this.item.is_new = this.is_new;


            this.itemService.updateItem(this.itemId, this.item)
                .subscribe(
                    (item: any) => {
                        if (this.user.type === 'ADMIN') {
                            this.router.navigate(['/user/item-table']);
                        } else {
                            this.router.navigate(['/user/item-list']);
                        }

                    },
                    (error: any) => {
                        this.errorMsg = 'Create unsuccessfully';
                        this.errorFlag = true;
                    }
                );
        } else {
            this.errorFlag = true;
        }
    }

    deleteItem() {
        this.itemService.deleteItem(this.itemId)
            .subscribe(
                (res: any) => {
                    this.router.navigate(['/user', 'dashboard']);
                }
            );
    }

}
