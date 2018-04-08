import {Component, OnInit} from '@angular/core';
import {Website} from '../../../models/website.model.client';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute} from '@angular/router';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-website-list',
  templateUrl: './website-list.component.html',
  styleUrls: ['./website-list.component.css']
})
export class WebsiteListComponent implements OnInit {

  user = {};
  userId: String;
  websites = [{}];

  constructor(private websiteService: WebsiteService,
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
}
