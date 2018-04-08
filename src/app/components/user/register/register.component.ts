import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../../services/user.service.client';
import {User} from '../../../models/user.model.client';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('f') loginForm: NgForm;

  username: String;
  password: String;
  verifyPassword: String;

  errorFlag: boolean;
  errorMsg = 'Please enter same password';

  constructor(private userService: UserService,
              private router: Router) {
  }

  register() {
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    this.verifyPassword = this.loginForm.value.verifyPassword;

    if (this.password && this.verifyPassword && this.password === this.verifyPassword) {
      this.errorFlag = false;

      this.userService.register(this.username, this.password).subscribe(
        (data: any) => {
          this.router.navigate(['/user']);
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
