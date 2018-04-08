import {Component, OnInit, ViewChild} from '@angular/core';
import {PageService} from '../../../services/page.service.client';
import {Page} from '../../../models/page.model.client';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-page-new',
  templateUrl: './page-new.component.html',
  styleUrls: ['./page-new.component.css']
})
export class PageNewComponent implements OnInit {

  @ViewChild('f') pageForm: NgForm;

  name: String;
  title: String;
  userId: String;
  websiteId: String;
  pages = [{}];
  user = {};

  constructor(private pageService: PageService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private sharedService: SharedService) {
  }

  createPage() {
    this.name = this.pageForm.value.name;
    this.title = this.pageForm.value.title;

    const page: Page = new Page(null, this.name, this.websiteId, this.title);
    this.pageService.createPage(this.websiteId, page).subscribe(
      (resultPage: any) => {
        this.router.navigate(['/user', 'website', this.websiteId, 'page']);
      }
    );
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
