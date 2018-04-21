import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
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

    register(user: any) {
        this.options.withCredentials = true;
        return this._http.post(this.baseUrl + '/api/register', user, this.options)
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
                        this.sharedService.user = '';
                        return false;
                    }
                }
            );
    }

    createUser(user: any) {
        const body = {
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
        return this._http.post(this.baseUrl + '/api/user/', body)
            .map(
                (res: Response) => {
                    return res.json();
                }
            );
    }

    findAllUsers() {
        return this._http.get(this.baseUrl + '/api/users')
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

    findWatchListForUser(userId: String) {
        return this._http.get(this.baseUrl + '/api/user/' + userId + '/watchlist')
            .map(
                (res: Response) => {
                    return res.json();
                }
            );
    }

    updateUser(userId: String, user: any) {
        const body = {
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

    addItemToWatchList(userId: String, itemId: String) {
        return this._http.put(this.baseUrl + '/api/user/' + userId + '/add/' + itemId, '')
            .map(
                (res: Response) => {
                    return res.json();
                }
            );
    }

    removeItemFromWatchList(userId: String, itemId: String) {
        return this._http.put(this.baseUrl + '/api/user/' + userId + '/remove/' + itemId, '')
            .map(
                (res: Response) => {
                    return res.json();
                }
            );
    }
}
