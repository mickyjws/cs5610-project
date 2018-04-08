import {Component, OnInit} from '@angular/core';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Widget} from '../../../../models/widget.model.client';
import {SharedService} from '../../../../services/shared.service';

@Component({
  selector: 'app-widget-html',
  templateUrl: './widget-html.component.html',
  styleUrls: ['./widget-html.component.css']
})
export class WidgetHTMLComponent implements OnInit {

  text: string;
  name: string;
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
            this.name = widget.name;
          }
        );
      }
    );
  }

  update() {
    if (this.name) {
      this.errorFlag = false;
      const newWidget: Widget = new Widget(
        this.widgetId, 'HTML', this.pageId, null, this.text, null, null, this.name
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
