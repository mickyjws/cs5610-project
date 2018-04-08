import {Injectable} from '@angular/core';
import {Page} from '../models/page.model.client';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';

@Injectable()

export class PageService {

  constructor(private _http: Http) {
  }

  baseUrl = environment.baseUrl;

  createPage(websiteId: String, page: Page) {
    const body = {
      name: page.name,
      title: page.title,
    };
    return this._http.post(this.baseUrl + '/api/website/' + websiteId + '/page/', body)
      .map(
        (res: Response) => {
          return res.json();
        }
      );
  }

  findPageByWebsiteId(websiteId: String) {
    return this._http.get(this.baseUrl + '/api/website/' + websiteId + '/page')
      .map(
        (res: Response) => {
          return res.json();
        }
      );
  }

  findPageById(pageId: String) {
    return this._http.get(this.baseUrl + '/api/page/' + pageId)
      .map(
        (res: Response) => {
          return res.json();
        }
      );
  }

  updatePage(pageId: String, page: Page) {
    const body = {
      name: page.name,
      title: page.title,
    };
    return this._http.put(this.baseUrl + '/api/page/' + pageId, body)
      .map(
        (res: Response) => {
          return res.json();
        }
      );
  }

  deletePage(pageId: String) {
    return this._http.delete(this.baseUrl + '/api/page/' + pageId)
      .map(
        (res: Response) => {
          return res.json();
        }
      );
  }

}
