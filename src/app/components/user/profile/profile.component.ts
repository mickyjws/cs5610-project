import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../models/user.model.client';
import {Website} from '../../../models/website.model.client';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username: String;
  password: String;
  firstName: String;
  lastName: String;
  email: String;
  userId: String;
  user = {};

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
  }

  update() {
    const newUser: User = new User(this.userId, this.username, this.password, this.firstName, this.lastName, this.email);
    this.userService.updateUser(this.userId, newUser).subscribe(
      (data: any) => {
        this.errorFlag = false;
      }, (error: any) => {
        this.errorFlag = true;
        this.errorMsg = 'Failed to update';
      }
    );
  }

  delete() {
    this.userService.deleteUser(this.userId).subscribe(
      (data: any) => {
        this.router.navigate(['/login']);
      }
    );
  }

  logout() {
    this.userService.logout()
      .subscribe(
        (data: any) => this.router.navigate(['/login'])
      );
  }
}
