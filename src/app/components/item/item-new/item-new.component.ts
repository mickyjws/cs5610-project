import {Component, OnInit, ViewChild} from '@angular/core';
import {ItemService} from '../../../services/item.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../../../services/shared.service';
import {NgForm} from '@angular/forms';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'app-item-new',
    templateUrl: './item-new.component.html',
    styleUrls: ['./item-new.component.css']
})
export class ItemNewComponent implements OnInit {
    @ViewChild('f') submitForm: NgForm;

    category: String;
    name: String;
    price: Number;
    url: String;
    title: String;
    description: String;
    is_new: Boolean;

    user: any;
    userId: String;
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
    }

    create() {
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

            this.title = this.submitForm.value.title;
            this.description = this.submitForm.value.description;
            this.is_new = this.submitForm.value.is_new;

            const tempItem = {
                category: this.category,
                name: this.name,
                price: this.price,
                title: this.title,
                description: this.description,
                is_new: this.is_new,
            };

            this.itemService.createItem(this.userId, tempItem)
                .subscribe(
                    (item: any) => {
                        this.router.navigate(['/user', 'item', item._id]);
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
}
