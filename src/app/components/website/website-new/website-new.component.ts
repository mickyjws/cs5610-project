import {Component, OnInit} from '@angular/core';
import {Website} from '../../../models/website.model.client';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-website-new',
  templateUrl: './website-new.component.html',
  styleUrls: ['./website-new.component.css']
})
export class WebsiteNewComponent implements OnInit {

  name: String;
  description: String;
  userId: String;
  websites = [];
  user = {};

  errorFlag: boolean;
  errorMsg = 'Empty name!';

  constructor(private websiteService: WebsiteService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private sharedService: SharedService) {
  }

  ngOnInit() {
    this.user = this.sharedService.user;
    this.userId = this.user['_id'];
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.websiteService.findWebsitesByUser(this.userId).subscribe(
          (websites: any) => {
            this.websites = websites;
          }
        );
      }
    );
  }

  create() {
    if (this.name) {
      this.errorFlag = false;
      const newWebsite: Website = new Website(
        '',
        this.name,
        this.userId,
        this.description);

      this.websiteService.createWebsite(this.userId, newWebsite).subscribe(
        (website: any) => {
          this.websites.push(website);
          this.router.navigate(['/user', 'website']);
        }
      );
    } else {
      this.errorFlag = true;
    }
  }
}
