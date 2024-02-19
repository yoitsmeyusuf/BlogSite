import { Component } from '@angular/core';
import { BlogService, Blog} from '../blog.services';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-control-panel-component',
  standalone: true,
  imports: [FormsModule],
  providers: [BlogService],
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.css'
})
export class ControlPanelComponent {
  blog: Blog = {
    postID: '',
    title: '',
    content: '',
    category: '',
    publishDate: '',
    imageURL: ''
  };
  model =this.blog;

  constructor(private blogService: BlogService) { }
  createBlog() {
    this.blogService.createBlog(this.blog.title, this.blog.content, this.blog.category, this.blog.imageURL)
      .subscribe(response => {
        // Handle response here
        console.log(response);
      }, error => {
        // Handle error here
        console.error(error);
      });
  }

  deleteBlog() {
    this.blogService.deleteBlog(this.blog.postID)
      .subscribe(response => {
        // Handle response here
        console.log(response);
      }, error => {
        // Handle error here
        console.error(error);
      });
  }
  
  logout() {
    this.blogService.logout();
    window.location.reload();
  }
}
