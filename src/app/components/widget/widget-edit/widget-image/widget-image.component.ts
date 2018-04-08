import {Component, OnInit} from '@angular/core';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Widget} from '../../../../models/widget.model.client';
import {environment} from '../../../../../environments/environment';
import {SharedService} from '../../../../services/shared.service';

@Component({
  selector: 'app-widget-image',
  templateUrl: './widget-image.component.html',
  styleUrls: ['./widget-image.component.css']
})
export class WidgetImageComponent implements OnInit {

  name: string;
  text: string;
  url: string;
  width: string;
  userId: String;
  websiteId: String;
  pageId: String;
  widgetId: String;
  user = {};

  errorFlag: boolean;
  errorMsg = 'Name and URL cannot be empty!';

  baseUrl: String;

  constructor(private widgetService: WidgetService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private sharedService: SharedService) {
    this.baseUrl = environment.baseUrl;
  }

  ngOnInit() {
    this.user = this.sharedService.user;
    this.userId = this.user['_id'];

    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.websiteId = params['wid'];
        this.pageId = params['pid'];
        this.widgetId = params['wgid'];

        this.widgetService.findWidgetById(this.widgetId).subscribe(
          (widget: any) => {
            this.name = widget.name;
            this.text = widget.text;
            this.url = widget.url;
            this.width = widget.width;
          }
        );
      }
    );
  }

  update() {
    if (this.url && this.name) {
      this.errorFlag = false;
      const newWidget: Widget = new Widget(
        this.widgetId, 'IMAGE', this.pageId, null, this.text, this.url, this.width, this.name
      );
      this.widgetService.updateWidget(this.widgetId, newWidget).subscribe(
        (widget: any) => {
          this.router.navigate(['/user', 'website', this.websiteId, 'page', this.pageId, 'widget']);
        }
      );
    } else {
      this.errorFlag = true;
    }
  }

  delete() {
    this.widgetService.deleteWidget(this.widgetId).subscribe(
      (widgetId: String) => {
        this.router.navigate(['/user', 'website', this.websiteId, 'page', this.pageId, 'widget']);
      }
    );
  }

}
