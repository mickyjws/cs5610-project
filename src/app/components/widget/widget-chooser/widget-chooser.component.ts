import {Component, OnInit} from '@angular/core';
import {WidgetService} from '../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Widget} from '../../../models/widget.model.client';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-widget-chooser',
  templateUrl: './widget-chooser.component.html',
  styleUrls: ['./widget-chooser.component.css']
})
export class WidgetChooserComponent implements OnInit {

  userId: String;
  websiteId: String;
  pageId: String;
  user = {};

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
      }
    );
  }

  chooseWidget(widgetType: String) {
    const newWidget: Widget = new Widget(
      '',
      widgetType,
      this.pageId,
      null,
      null,
      null,
      null
    );

    this.widgetService.createWidget(this.pageId, newWidget).subscribe(
      (widget: any) => {
        this.router.navigate(['/user', 'website', this.websiteId, 'page', this.pageId, 'widget', widget._id]);
      }
    );
  }
}
