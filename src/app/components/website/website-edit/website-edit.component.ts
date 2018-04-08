import {Component, OnInit} from '@angular/core';
import {Website} from '../../../models/website.model.client';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {

  name: String;
  description: String;
  userId: String;
  websiteId: String;
  websites = [{}];
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
        this.websiteId = params['wid'];

        this.websiteService.findWebsiteById(this.websiteId).subscribe(
          (website: any) => {
            this.name = website.name;
            this.description = website.description;
          }
        );

        this.websiteService.findWebsitesByUser(this.userId).subscribe(
          (websites: Website[]) => {
            this.websites = websites;
          }
        );
      }
    );
  }

  redirect(websiteId: String) {
    this.websiteService.findWebsiteById(websiteId).subscribe(
      (website: any) => {
        this.name = website.name;
        this.description = website.description;
      }
    );
  }

  update() {
    if (this.name) {
      this.errorFlag = false;
      const newWebsite: Website = new Website(this.websiteId, this.name, this.userId, this.description);
      this.websiteService.updateWebsite(this.websiteId, newWebsite).subscribe(
        (website: any) => {
          this.router.navigate(['/user', 'website']);
        }
      );
    } else {
      this.errorFlag = true;
    }
  }

  delete() {
    this.websiteService.deleteWebsite(this.websiteId).subscribe(
      (websiteId: String) => {
        this.router.navigate(['/user', 'website']);
      }
    );
  }
}
