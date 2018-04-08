import {Component, OnInit} from '@angular/core';
import {WidgetService} from '../../../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {FlickrService} from '../../../../../services/flickr.service.client';
import {Widget} from '../../../../../models/widget.model.client';
import {SharedService} from '../../../../../services/shared.service';

@Component({
  selector: 'app-flickr-image-search',
  templateUrl: './flickr-image-search.component.html',
  styleUrls: ['./flickr-image-search.component.css']
})
export class FlickrImageSearchComponent implements OnInit {

  userId: String;
  websiteId: String;
  pageId: String;
  widgetId: String;
  searchText: String;
  photos = [];
  user = {};

  constructor(private widgetService: WidgetService,
              private flickrService: FlickrService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private sharedService: SharedService) {
  }

  ngOnInit() {
    this.user = this.sharedService.user;
    this.userId = this.user['_id'];

    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.websiteId = params['wid'];
        this.pageId = params['pid'];
        this.widgetId = params['wgid'];
      }
    );
  }

  searchPhotos() {
    this.flickrService.searchPhotos(this.searchText).subscribe(
      (data: any) => {
        let val = data._body;
        val = val.replace('jsonFlickrApi(', '');
        val = val.substring(0, val.length - 1);
        val = JSON.parse(val);
        this.photos = val.photos;
      }
    );
  }

  selectPhoto(photo) {
    let url = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server;
    url += '/' + photo.id + '_' + photo.secret + '_b.jpg';

    const newWidget: Widget = new Widget(
      this.widgetId, 'IMAGE', this.pageId, null, null, url, null
    );
    this.widgetService.updateWidget(this.widgetId, newWidget).subscribe(
      (data: any) => {
        this.router.navigate(['/user', 'website', this.websiteId, 'page', this.pageId, 'widget']);
      }
    );
  }

}
