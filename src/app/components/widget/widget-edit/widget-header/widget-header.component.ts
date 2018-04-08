import {Component, OnInit} from '@angular/core';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Widget} from '../../../../models/widget.model.client';
import {SharedService} from '../../../../services/shared.service';

@Component({
  selector: 'app-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.css']
})
export class WidgetHeaderComponent implements OnInit {

  name: string;
  text: string;
  size: string;
  userId: String;
  websiteId: String;
  pageId: String;
  widgetId: String;
  user = {};

  errorFlag: boolean;
  errorMsg = 'Please Enter Name';

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
            this.size = widget.size;
          }
        );
      }
    );
  }

  update() {
    if (this.name) {
      this.errorFlag = false;
      const newWidget: Widget = new Widget(
        this.widgetId, 'HEADING', this.pageId, this.size, this.text, null, null, this.name
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
