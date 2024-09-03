import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { BlogService, Blog, User } from '../blog.services';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { v4 as uuid } from 'uuid';

import { JoditAngularModule } from 'jodit-angular';
import { JoditAngularComponent } from 'jodit-angular';
import { from } from 'rxjs';

@Component({
  selector: 'app-control-panel-component',
  standalone: true,
  imports: [FormsModule, JoditAngularModule, CommonModule],
  providers: [BlogService],
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.css',
})
export class ControlPanelComponent implements OnInit {
  //refresh
  removeTag(index: number) {
    this.tags.splice(index, 1);
    console.log(this.tags);
  }
  addTag(event: any) {
    if (this.blog.tags.includes(' ')) {
      this.tags.push(this.blog.tags.trim());
      console.log(this.tags);
      this.blog.tags = '';
    }
  }

  addTagEnter(number: any) {
    this.tags.push(this.AllTags[number]);
    console.log(this.tags);
  }
  blog: any = {
    postID: '',
    title: '',
    content: '',
    category: '',
    publishDate: '',
    tags: '',
  };
  user: User = {
    userID: '',
    username: '',
    password: '',
    imageURL: '',
  };
  AllTags: string[] = [];
  tags: string[] = [];
  name: string = '';
  selectedFile: any;
  ngOnInit(): void {
    this.getAllTags();
  }
  // write an function with  whoami and get the name of the user

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = event.target.result;
    });

    reader.readAsDataURL(file);
    reader.onload = (event: any) => {
      this.selectedFile = event.target.result;
    };
    console.log(this.selectedFile);
  }
  model = this.blog;

  constructor(private blogService: BlogService, private router: Router) {}

  config: object = {
    uploader: { insertImageAsBase64URI: true },
    zIndex: 0,
    readonly: false,
    activeButtonsInReadOnly: ['source', 'fullsize', 'print', 'about', 'dots'],
    toolbarButtonSize: 'middle',
    theme: 'white',
    saveModeInCookie: false,
    spellcheck: true,
    editorCssClass: false,
    extraPlugins: ['emoji'],
    triggerChangeEvent: true,
    width: 'auto',
    height: 'auto',
    minHeight: 500,
    maxWidth: 200000,
    direction: '',
    language: 'auto',
    debugLanguage: false,
    i18n: 'en',
    tabIndex: -1,
    toolbar: true,
    enter: 'P',
    useSplitMode: true,
    colors: {
      greyscale: [
        '#000000',
        '#434343',
        '#666666',
        '#999999',
        '#B7B7B7',
        '#CCCCCC',
        '#D9D9D9',
        '#EFEFEF',
        '#F3F3F3',
        '#FFFFFF',
      ],
      palette: [
        '#980000',
        '#FF0000',
        '#FF9900',
        '#FFFF00',
        '#00F0F0',
        '#00FFFF',
        '#4A86E8',
        '#0000FF',
        '#9900FF',
        '#FF00FF',
      ],
      full: [
        '#E6B8AF',
        '#F4CCCC',
        '#FCE5CD',
        '#FFF2CC',
        '#D9EAD3',
        '#D0E0E3',
        '#C9DAF8',
        '#CFE2F3',
        '#D9D2E9',
        '#EAD1DC',
        '#DD7E6B',
        '#EA9999',
        '#F9CB9C',
        '#FFE599',
        '#B6D7A8',
        '#A2C4C9',
        '#A4C2F4',
        '#9FC5E8',
        '#B4A7D6',
        '#D5A6BD',
        '#CC4125',
        '#E06666',
        '#F6B26B',
        '#FFD966',
        '#93C47D',
        '#76A5AF',
        '#6D9EEB',
        '#6FA8DC',
        '#8E7CC3',
        '#C27BA0',
        '#A61C00',
        '#CC0000',
        '#E69138',
        '#F1C232',
        '#6AA84F',
        '#45818E',
        '#3C78D8',
        '#3D85C6',
        '#674EA7',
        '#A64D79',
        '#85200C',
        '#990000',
        '#B45F06',
        '#BF9000',
        '#38761D',
        '#134F5C',
        '#1155CC',
        '#0B5394',
        '#351C75',
        '#733554',
        '#5B0F00',
        '#660000',
        '#783F04',
        '#7F6000',
        '#274E13',
        '#0C343D',
        '#1C4587',
        '#073763',
        '#20124D',
        '#4C1130',
      ],
    },
    colorPickerDefaultTab: 'background',
    imageDefaultWidth: 500,
    imageDefaultAlign: 'center',
    imageDefaultMargin: 10,

    removeButtons: [],
    disablePlugins: [],
    extraButtons: [],
    sizeLG: 900,
    sizeMD: 700,
    sizeSM: 400,
    buttons: [
      'source',
      '|',
      'bold',
      'strikethrough',
      'underline',
      'italic',
      '|',
      'ul',
      'ol',
      '|',
      'outdent',
      'indent',
      '|',
      'font',
      'fontsize',
      'brush',
      'paragraph',
      '|',
      'image',
      'video',
      'table',
      'link',
      '|',
      'align',
      'undo',
      'redo',
      '|',
      'hr',
      'eraser',
      'copyformat',
      '|',
      'symbol',
      'fullsize',
      'print',
      'about',
    ],

    buttonsXS: [
      'bold',
      'image',
      '|',
      'brush',
      'paragraph',
      '|',
      'align',
      '|',
      'undo',
      'redo',
      '|',
      'eraser',
      'dots',
    ],
    events: {},
    textIcons: false,
  };

  onCategoryChange(event: any) {
    const labels = document.querySelectorAll('.radioButtons label');
    labels.forEach((label: any) => {
      label.classList.remove('selected');
    });
    event.target.parentNode.classList.add('selected');
  }

  async createBlog() {
    // eger title ve content bos ise alert ver
    if (!this.blog.title || !this.blog.content) {
      alert('Başlık ve içerik alanlarını doldurunuz.');
      return;
    }

    let newcon = this.processHtmlContent(this.blog.content);

    const formData = new FormData();

    // HTML içeriğin alınması
    const htmlContent = this.blog.content;

    // Resim verilerinin HTML kodundan ayrıştırılması

    const images = htmlContent.match(/<img src="(.*?)"/g);

    //match with img if its not link
    if (images) {
      for (const image of images!) {
        console.log(image);
        //remove data:image/png;base64, from the base64 string and the last "
        //or data:image/jpg;base64  from the base64 string and the last "
        const img = image.match(/data:image\/(png|jpg|jpeg);base64,(.*)"/);

        if (img) {
          console.log('selam');
          formData.append('images', img[2]);
          const imageSrcMatch = image.match(/"(.*?)"/);
          if (imageSrcMatch) {
            const imageSrc = imageSrcMatch[1];
            const imageData = await fetch(imageSrc).then((response) =>
              response.blob()
            );
            let uuidnew = uuid();
            formData.append('names', uuidnew);

          //change the image source to the new one
          newcon = newcon.replace(imageSrc, 'https://devapi.ahmetturanpolat.com/images/' + uuidnew + ".jpg");
        }
      }
    }
  }
    // delete the selectedfile's data:image/png;base64, from the base64 string
    this.selectedFile = this.selectedFile.replace(
      /data:image\/(png|jpeg|jpg);base64,/,
      ''
    );
    console.log(this.selectedFile);

    formData.append('content', newcon);
    formData.append('Title', this.blog.title);
    formData.append('Category', this.blog.category);
    formData.append('ImageURL', this.selectedFile);
    formData.append('Author', '0');
    formData.append('TagsList', this.tags.join(','));
    console.log(formData);
    this.blogService.createBlog(formData).subscribe(
      (response) => {
        // Handle response here
        console.log(response);
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
      },
      (error) => {
        // Handle error here
        console.error(error);
      }
    );

    //refresh
  }

  //get all tags
  getAllTags() {
    this.blogService.getAllTags().subscribe((data: any) => {
      this.AllTags = data;
    });
  }

  updateUser() {
    this.blogService
      .Userupdate(this.user.username, this.user.password)
      .subscribe(
        (response) => {},
        (error) => {
          // Handle error here
          console.error(error);
        }
      );

    //upload image

    if (this.selectedFile) {
      this.selectedFile = this.selectedFile.replace(
        /data:image\/(png|jpeg|jpg);base64,/,
        ''
      );
      const formData = new FormData();
      formData.append('Filecode', this.selectedFile);
      formData.append('Names', 'profile');
      this.blogService.uploadImage(formData).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          // Handle error here
          console.error(error);
        }
      );
    }
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
    this.blogService.deleteBlog(this.blog.postID).subscribe(
      (response) => {
        // Handle response here
        console.log(response);
      },
      (error) => {
        // Handle error here
        console.error(error);
      }
    );
  }

  logout() {
    this.blogService.logout();
    window.location.reload();
  }
}
