import { Component } from '@angular/core';
import { BlogService, User } from '../blog.services';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-userupdate',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './userupdate.component.html',
  styleUrl: './userupdate.component.css'
})
export class UserupdateComponent {
  constructor(private blogService: BlogService) {

  }
  inputType: string = 'password';
  toggleInputType() {
    this.inputType = this.inputType === 'password' ? 'text' : 'password';
  }
  user : User ={
    userID: '',
    username: '',
    password: '',
    imageURL: ''
  }
  setBackground(color: string): void {
    const inputElements = document.querySelectorAll('.inputPosition');
    inputElements.forEach((element: Element) => {
      (element as HTMLElement).style.backgroundColor = color;
    });
  }
  name!: User;
  ngAfterViewInit(): void {
    this.blogService.whoami().subscribe((data: any) => {

      return this.name = data;
    });
  }
  selectedFile: any;

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

        this.selectedFile = event.target.result;
    });

    reader.readAsDataURL(file);
    reader.onload = (event: any) => {
      this.selectedFile = event.target.result;
    }
    console.log(this.selectedFile);

  }
  updateUser() {
    this.blogService.Userupdate(this.user.username, this.user.password)
      .subscribe(response => {
        console.log(this.user.password);
        console.log(this.user.username);
      
console.log(response);

      }, error => {
        // Handle error here
        console.error(error);
      });

      //upload image

      if (this.selectedFile) {
        this.selectedFile = this.selectedFile.replace(/data:image\/(png|jpeg|jpg);base64,/, '');
        const formData = new FormData();
        formData.append('Filecode', this.selectedFile);
        formData.append('Names', "profile");
        this.blogService.uploadImage(formData).subscribe(response => {
         console.log(response);
        }
        ,error => {
          // Handle error here
          console.error(error);
        });
      }




  }
}
