import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()

export class FlickrService {

  // Use key and secret from instructor's example
  key = '90ea0df0685933f65ea96fab852a3023';
  secret = '59b7fb7ceb0a467b';
  urlBase = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT';

  constructor(private _http: Http) {
  }

  searchPhotos(searchTerm: any) {
    const url = this.urlBase.replace('API_KEY', this.key).replace('TEXT', searchTerm);
    return this._http.get(url);
  }
}
