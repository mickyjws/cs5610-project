import {Component, OnInit} from '@angular/core';
import {PageService} from '../../../services/page.service.client';
import {Page} from '../../../models/page.model.client';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {

  name: String;
  title: String;
  userId: String;
  websiteId: String;
  pageId: String;
  pages = [{}];
  user = {};

  errorFlag: boolean;
  errorMsg = 'Empty name!';

  constructor(private pageService: PageService,
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

        this.pageService.findPageById(this.pageId).subscribe(
          (page: any) => {
            this.name = page.name;
            this.title = page.title;
          }
        );

        this.pageService.findPageByWebsiteId(this.websiteId).subscribe(
          (pages: any) => {
            this.pages = pages;
          }
        );
      }
    );
  }

  update() {
    if (this.name) {
      this.errorFlag = false;
      const newPage: Page = new Page(this.pageId, this.name, this.websiteId, this.title);
      this.pageService.updatePage(this.pageId, newPage).subscribe(
        (page: any) => {
          this.router.navigate(['/user', 'website', this.websiteId, 'page']);
        }
      );
    } else {
      this.errorFlag = true;
    }
  }

  delete() {
    this.pageService.deletePage(this.pageId).subscribe(
      (params: any) => {
        this.router.navigate(['/user', 'website', this.websiteId, 'page']);
      }
    );

  }
}
