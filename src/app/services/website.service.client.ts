import {Injectable} from '@angular/core';
import {Website} from '../models/website.model.client';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';

@Injectable()

export class WebsiteService {

  constructor(private _http: Http) {
  }

  baseUrl = environment.baseUrl;

  createWebsite(userId: String, website: Website) {
    const body = {
      name: website.name,
      description: website.description,
    };
    return this._http.post(this.baseUrl + '/api/user/' + userId + '/website', body)
      .map(
        (res: Response) => {
          return res.json();
        }
      );
  }

  findWebsitesByUser(userId: String) {
    return this._http.get(this.baseUrl + '/api/user/' + userId + '/website')
      .map(
        (res: Response) => {
          return res.json();
        }
      );
  }

  findWebsiteById(websiteId: String) {
    return this._http.get(this.baseUrl + '/api/website/' + websiteId)
      .map(
        (res: Response) => {
          return res.json();
        }
      );
  }

  updateWebsite(websiteId: String, website: Website) {
    const body = {
      _user: website.developerId,
      name: website.name,
      description: website.description,
    };
    return this._http.put(this.baseUrl + '/api/website/' + websiteId, body)
      .map(
        (res: Response) => {
          return res.json();
        }
      );
  }

  deleteWebsite(websiteId: String) {
    return this._http.delete(this.baseUrl + '/api/website/' + websiteId)
      .map(
        (res: Response) => {
          return res.json();
        }
      );
  }
}
