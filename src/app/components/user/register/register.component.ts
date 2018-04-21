import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {Router} from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    constructor(private userService: UserService,
                private router: Router) {
    }

    routeToRegister(type: String) {
        if (type === 'ADMIN') {
            this.router.navigate(['/register', 'admin']);
        } else if (type === 'BUYER') {
            this.router.navigate(['/register', 'buyer']);
        } else if (type === 'SELLER') {
            this.router.navigate(['/register', 'seller']);
        }
    }

    ngOnInit() {
    }
}
