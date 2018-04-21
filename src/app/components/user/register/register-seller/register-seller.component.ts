import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../../services/user.service.client';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
    selector: 'app-register-seller',
    templateUrl: './register-seller.component.html',
    styleUrls: ['./register-seller.component.css', '../register.component.css']
})
export class RegisterSellerComponent implements OnInit {

    @ViewChild('f') loginForm: NgForm;

    username: String;
    password: String;
    vfpassword: String;

    firstName: String;
    lastName: String;
    email: String;
    phone: String;
    gender: String;
    address: String;
    city: String;
    state: String;
    zip: String;

    errorFlag: boolean;
    errorMsg = 'Password does not match';

    constructor(private userService: UserService,
                private router: Router) {
    }

    register() {
        this.username = this.loginForm.value.username;
        this.password = this.loginForm.value.password;
        this.vfpassword = this.loginForm.value.vfpassword;

        this.firstName = this.loginForm.value.firstName;
        this.lastName = this.loginForm.value.lastName;
        this.email = this.loginForm.value.email;
        this.phone = this.loginForm.value.phone;
        this.gender = this.loginForm.value.gender;
        this.address = this.loginForm.value.address;
        this.city = this.loginForm.value.city;
        this.state = this.loginForm.value.state;
        this.zip = this.loginForm.value.zip;

        const user = {
            type: 'SELLER',
            username: this.username,
            password: this.password,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phone: this.phone,
            gender: this.gender,
            address: this.address,
            city: this.city,
            state: this.state,
            zip: this.zip
        };


        if (this.password && this.vfpassword && this.password === this.vfpassword) {
            this.errorFlag = false;

            this.userService.register(user).subscribe(
                (data: any) => {
                    this.router.navigate(['/home']);
                }, (err) => {
                    this.errorFlag = true;
                    this.errorMsg = err._body;
                }
            );
        } else {
            this.errorFlag = true;
        }
    }

    ngOnInit() {
    }

}
