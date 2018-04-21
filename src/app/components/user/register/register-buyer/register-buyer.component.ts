import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../../services/user.service.client';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
    selector: 'app-register-buyer',
    templateUrl: './register-buyer.component.html',
    styleUrls: ['./register-buyer.component.css', '../register.component.css']
})
export class RegisterBuyerComponent implements OnInit {

    @ViewChild('f') loginForm: NgForm;

    username: String;
    password: String;
    vfpassword: String;

    type: String;
    firstName: String;
    lastName: String;
    email: String;
    phone: String;

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

        const user = {
            type: 'BUYER',
            username: this.username,
            password: this.password,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phone: this.phone
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
