import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {Router} from '@angular/router';
import {SharedService} from '../../../services/shared.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css', '../register/register.component.css']
})
export class ProfileComponent implements OnInit {

    username: String;
    password: String;
    type: String;
    firstName: String;
    lastName: String;
    email: String;
    userId: String;
    phone: String;
    gender: String;
    address: String;
    city: String;
    state: String;
    zip: String;
    user: any;

    errorFlag: boolean;
    errorMsg: String;

    constructor(private userService: UserService,
                private router: Router,
                private sharedService: SharedService) {
    }

    ngOnInit() {
        this.user = this.sharedService.user;
        this.username = this.user['username'];
        this.firstName = this.user['firstName'];
        this.lastName = this.user['lastName'];
        this.email = this.user['email'];
        this.userId = this.user['_id'];
        this.password = this.user['password'];
        this.type = this.user['type'];
        this.phone = this.user['phone'];
        this.address = this.user['address'];
        this.city = this.user['city'];
        this.state = this.user['state'];
        this.zip = this.user['zip'];
        this.gender = this.user['gender'];
    }

    update(user) {
        const re_email = new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$');
        const re_zip = new RegExp('^[0-9]{5}(?:-[0-9]{4})?$');

        if (!re_email.test(user.email)) {
            this.errorFlag = true;
            this.errorMsg = 'Email is not in valid format';
            return;
        }

        if (user.zip !== undefined && !re_zip.test(user.zip)) {
            this.errorFlag = true;
            this.errorMsg = 'Zip is not in valid format';
            return;
        }

        const tempUser = {
            username: user.username,
            password: user.password,
            type: user.type,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            gender: user.gender,
            address: user.address,
            city: user.city,
            state: user.state,
            zip: user.zip
        };

        this.userService.updateUser(this.userId, tempUser).subscribe(
            (res: any) => {
                this.sharedService.user = res;
                this.router.navigate(['/user', 'dashboard']);
            }, (error: any) => {
                this.errorFlag = true;
                this.errorMsg = 'Failed to update';
            }
        );
    }

    delete() {
        this.userService.deleteUser(this.userId).subscribe(
            (data: any) => {
                this.router.navigate(['/']);
            }
        );
    }
}
