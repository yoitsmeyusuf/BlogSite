import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../blog.services';

@Component({
  standalone: true,
  selector: 'app-blog',
  templateUrl: 'blogcard.component.html',
  styleUrls: ['./blogcard.component.scss'],

})
export class BlogComponent implements OnInit {
  blogs : any = [];

  constructor(private blogService: BlogService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.blogService.getBlog(params['id']).subscribe(blog => {
        this.blogs = blog;
      });
    });
  }
}