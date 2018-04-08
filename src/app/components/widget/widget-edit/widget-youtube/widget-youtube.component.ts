import {Component, OnInit} from '@angular/core';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Widget} from '../../../../models/widget.model.client';
import {SharedService} from '../../../../services/shared.service';

@Component({
  selector: 'app-widget-youtube',
  templateUrl: './widget-youtube.component.html',
  styleUrls: ['./widget-youtube.component.css']
})
export class WidgetYoutubeComponent implements OnInit {

  name: string;
  text: string;
  url: string;
  width: string;
  height: string;
  userId: String;
  websiteId: String;
  pageId: String;
  widgetId: String;
  user = {};

  errorFlag: boolean;
  errorMsg = 'Name and URL cannot be empty!';

  constructor(private widgetService: WidgetService,
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

        this.widgetService.findWidgetById(this.widgetId).subscribe(
          (widget: any) => {
            this.name = widget.name;
            this.text = widget.text;
            this.url = widget.url;
            this.width = widget.width;
            this.height = widget.height;
          }
        );
      }
    );
  }

  update() {
    if (this.name && this.url) {
      this.errorFlag = false;
      const newWidget: Widget = new Widget(
        this.widgetId, 'YOUTUBE', this.pageId, null, this.text, this.url, this.width,
        this.name, null, null, null, this.height
      );
      this.widgetService.updateWidget(this.widgetId, newWidget).subscribe(
        (data: any) => {
          this.router.navigate(['/user', 'website', this.websiteId, 'page', this.pageId, 'widget']);
        }
      );
    } else {
      this.errorFlag = true;
    }
  }

  delete() {
    this.widgetService.deleteWidget(this.widgetId).subscribe(
      (data: any) => {
        this.router.navigate(['/user', 'website', this.websiteId, 'page', this.pageId, 'widget']);
      }
    );
  }

}
