import {Component, OnInit} from '@angular/core';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Widget} from '../../../../models/widget.model.client';
import {SharedService} from '../../../../services/shared.service';

@Component({
  selector: 'app-widget-text',
  templateUrl: './widget-text.component.html',
  styleUrls: ['./widget-text.component.css']
})
export class WidgetTextComponent implements OnInit {

  text: string;
  size: string;
  rows: string;
  name: string;
  placeholder: string;
  formatted: boolean;
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
            this.text = widget.text;
            this.size = widget.size;
            this.rows = widget.rows;
            this.name = widget.name;
            this.placeholder = widget.placeholder;
            this.formatted = widget.formatted;
          }
        );
      }
    );
  }

  update() {
    if (this.name) {
      this.errorFlag = false;
      const newWidget: Widget = new Widget(
        this.widgetId, 'INPUT', this.pageId, this.size, this.text, null, null,
        this.name, this.rows, this.placeholder, this.formatted
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
