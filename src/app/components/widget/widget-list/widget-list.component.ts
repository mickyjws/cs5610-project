import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Widget} from '../../../models/widget.model.client';
import {WidgetService} from '../../../services/widget.service.client';
import {DomSanitizer} from '@angular/platform-browser';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
})
export class WidgetListComponent implements OnInit {

  userId: String;
  websiteId: String;
  pageId: String;
  widgetId: String;
  widgets = [{}];
  user = {};

  constructor(private widgetService: WidgetService,
              private activatedRoute: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private sharedService: SharedService) {
    this.sanitizer = sanitizer;
  }

  ngOnInit() {
    this.user = this.sharedService.user;
    this.userId = this.user['_id'];

    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.websiteId = params['wid'];
        this.pageId = params['pid'];
        this.widgetId = params['wgid'];
        this.widgetService.findWidgetsByPageId(this.pageId).subscribe(
          (widgets: any) => {
            // sort the widget list by its position
            widgets.sort(function (x, y) {
              return x.position - y.position;
            });
            this.widgets = widgets;
          }
        );
      }
    );
  }

  trustURL(url: string) {
    // Users are required to provide valid embed link start with https://www.youtube.com/embed/...
    const trustLink = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    return trustLink;
  }

  sortWidgets(index) {
    this.widgetService.sortWidgets(this.pageId, index.startIndex, index.endIndex).subscribe(
      (params: any) => {
      }
    );
  }
}
