import { Component } from '@angular/core';
import { BlogService, Blog} from '../blog.services';
import { FormsModule } from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill';
import Quill from 'quill';
import { v4 as uuid } from 'uuid';


@Component({
  selector: 'app-control-panel-component',
  standalone: true,
  imports: [FormsModule,QuillEditorComponent],
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
  
  model = this.blog;
  //write me an confguration for quill editor
  quill: any;

  quillConfig = {
<<<<<<< Updated upstream
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
  
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
  
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
  
        ['clean'],                                        // remove formatting button
        ['link', 'image', 'video']                        // link and image, video
      ]
    },
    theme: 'snow'  // or 'bubble'
  };
  //how can I get the images from quil editor
  // how to use quillconfig at quill

  constructor(private blogService: BlogService) { }
=======
    theme: 'snow',
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean'],                                         // remove formatting button
      ['link', 'image', 'video']         // link and image, video
    ],
    handlers: {
      
    }
    
  };
  //how can I get the images from quil editor
  
  constructor(private blogService: BlogService) {
    
   }
>>>>>>> Stashed changes

  // how to use quillconfig at quill
  ngAfterViewInit() {
    this.quill = new Quill('#editor', this.quillConfig);
  }
  async createBlog() {
    
    let newcon = this.processHtmlContent(this.blog.content);
    const editor = new Quill('#editor');

    const formData = new FormData();
    
    // HTML içeriğin alınması
    const htmlContent = editor.getSemanticHTML();
    
    // Resim verilerinin HTML kodundan ayrıştırılması
    const images = htmlContent.match(/<img src="(.*?)"/g);
    
//match with img if its not link

    for (const image of images!) {
      //remove data:image/png;base64, from the base64 string and the last "
      const img = image.match(/data:image\/png;base64,(.*)"/);

      if (img) {
        formData.append('images', img[1]);
        const imageSrcMatch = image.match(/"(.*?)"/);
        if (imageSrcMatch) {
          const imageSrc = imageSrcMatch[1];
          const imageData = await fetch(imageSrc).then(response => response.blob());
          let uuidnew = uuid();
          formData.append('names', uuidnew)

          //change the image source to the new one
          newcon =  newcon.replace(imageSrc, 'http://localhost:4000/images/'+uuidnew+".jpg");
        }
      }
    }
    formData.append('content', newcon);
    formData.append('Title', this.blog.title);
    formData.append('Category', this.blog.category);
    formData.append('ImageURL', this.blog.imageURL);
    console.log(formData);
    this.blogService.createBlog( formData)
      .subscribe(response => {
        // Handle response here
        console.log(response);
      }, error => {
        // Handle error here
        console.error(error);
      });
  }


  
   processHtmlContent(html: string): string {

const baseUrl = '';
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
  
    const imgTags = doc.getElementsByTagName('img');
    for (let i = 0; i < imgTags.length; i++) {
      const img = imgTags[i];
      const src = img.getAttribute('src');
      if (src && !src.startsWith('http')) {
        img.setAttribute('src', baseUrl + src);
      }
    }
  
    return doc.body.innerHTML;
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
