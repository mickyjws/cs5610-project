import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {User} from '../models/user.model.client';
import {SharedService} from '../services/shared.service';
import {Router} from '@angular/router';

@Injectable()

export class UserService {

  constructor(private _http: Http, private sharedService: SharedService,
              private router: Router) {
  }

  baseUrl = environment.baseUrl;

  options = new RequestOptions();

  login(username: String, password: String) {
    this.options.withCredentials = true;

    const body = {
      username: username,
      password: password
    };

    return this._http.post(this.baseUrl + '/api/login', body, this.options)
      .map(
        (res: Response) => {
          return res.json();
        }
      );
  }

  logout() {
    this.options.withCredentials = true;

    return this._http.post(this.baseUrl + '/api/logout', '', this.options)
      .map(
        (res: Response) => {
          return res;
        }
      );
  }

  register(username: String, password: String) {
    this.options.withCredentials = true;
    const body = {
      username: username,
      password: password
    };
    return this._http.post(this.baseUrl + '/api/register', body, this.options)
      .map(
        (res: Response) => {
          return res.json();
        }
      );
  }

  loggedIn() {
    this.options.withCredentials = true;
    return this._http.post(this.baseUrl + '/api/loggedIn', '', this.options)
      .map(
        (res: Response) => {
          const user = res.json();
          if (user !== 0) {
            this.sharedService.user = user;
            return true;
          } else {
            this.router.navigate(['/login']);
            return false;
          }
        }
      );
  }

  createUser(user: User) {
    const body = {
      username: user.username,
      password: user.password
    };
    return this._http.post(this.baseUrl + '/api/user/', body)
      .map(
        (res: Response) => {
          return res.json();
        }
      );
  }

  findUserById(userId: String) {
    return this._http.get(this.baseUrl + '/api/user/' + userId)
      .map(
        (res: Response) => {
          return res.json();
        }
      );
  }

  findUserByUsername(username: String) {
    return this._http.get(this.baseUrl + '/api/user?username=' + username)
      .map(
        (res: Response) => {
          return res.json();
        }
      );
  }

  findUserByCredentials(username: String, password: String) {
    return this._http.get(this.baseUrl + '/api/user?username=' + username + '&password=' + password)
      .map(
        (res: Response) => {
          return res.json();
        }
      );
  }

  updateUser(userId: String, user: User) {
    const body = {
      username: user.username,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName
    };
    return this._http.put(this.baseUrl + '/api/user/' + userId, body)
      .map(
        (res: Response) => {
          return res.json();
        }
      );
  }

  deleteUser(userId: String) {
    return this._http.delete(this.baseUrl + '/api/user/' + userId)
      .map(
        (res: Response) => {
          return res.json();
        }
      );
  }
}
