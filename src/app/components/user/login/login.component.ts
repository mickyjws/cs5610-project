import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {UserService} from '../../../services/user.service.client';
import {SharedService} from '../../../services/shared.service';
import {environment} from '../../../../environments/environment.prod';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    @ViewChild('f') loginForm: NgForm;

    username: String;
    password: String;
    errorFlag: boolean;
    errorMsg = 'Invalid username or password!';
    baseUrl: String;

    constructor(private userService: UserService,
                private router: Router,
                private sharedService: SharedService) {
        this.baseUrl = environment.baseUrl;
    }

    login() {
        this.username = this.loginForm.value.username;
        this.password = this.loginForm.value.password;

        this.userService.login(this.username, this.password)
            .subscribe(
                (data: any) => {
                    this.errorFlag = false;
                    this.sharedService.user = data;
                    this.router.navigate(['/home']);
                },
                (error: any) => {
                    this.errorFlag = true;
                }
            );
    }

    ngOnInit() {
    }
}
