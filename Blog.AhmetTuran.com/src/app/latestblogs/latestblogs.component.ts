import { Component } from '@angular/core';
import { BlogService } from '../blog.services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-latestblogs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './latestblogs.component.html',
  styleUrl: './latestblogs.component.scss'
})
export class LatestblogsComponent {
  constructor(private blogService: BlogService){}
  blogsrecent :any =[];
  ngOnInit():void{
    this.blogService.getRecentBlogs().subscribe(blogs=>{
      blogs.forEach((blog: any) => {
        blog.publishDate = blog.publishDate.split("T")[0];
      });this.blogsrecent=blogs})
  }
  
}
