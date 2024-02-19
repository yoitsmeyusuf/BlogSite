import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.services';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-blog',
  templateUrl: 'blogcard.component.html',
  styleUrls: ['./blogcard.component.scss'],
  imports: [CommonModule, RouterModule] 
})
export class CardComponent implements OnInit {
  blogs : any = [];

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.blogService.getBlogs().subscribe(blogs => {
      this.blogs = blogs;
    });
  }
  

}