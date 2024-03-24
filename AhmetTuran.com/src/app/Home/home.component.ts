import { Component } from '@angular/core';
import { BlogService, Blog} from '../blog.services';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [FormsModule,CommonModule],
  providers: [BlogService],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  blogs: Blog[] = [];

  constructor(private blogService: BlogService) {

  }

  ngOnInit(){
    this.blogService.getBlogs().subscribe(blogs => {
      // get 3 blogs
      // the content is must be only 40 and ... at the end slice it
      blogs.forEach(blog => {
        if(blog.content.length > 120){
          blog.content = blog.content.slice(0, 40) + '...';
        }
      });
      this.blogs = blogs.slice(0, 3);
    });
  }
}


