import {Component, OnInit} from '@angular/core';
import {Website} from '../../../models/website.model.client';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute} from '@angular/router';
import {Page} from '../../../models/page.model.client';
import {PageService} from '../../../services/page.service.client';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent implements OnInit {

  userId: String;
  websiteId: String;
  pages = [{}];
  user = {};

  constructor(private pageService: PageService,
              private activatedRoute: ActivatedRoute,
              private sharedService: SharedService) {
  }

  ngOnInit() {
    this.user = this.sharedService.user;
    this.userId = this.user['_id'];

    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.websiteId = params['wid'];
        this.pageService.findPageByWebsiteId(this.websiteId).subscribe(
          (pages: any) => {
            this.pages = pages;
          }
        );
      }
    );
  }
}
