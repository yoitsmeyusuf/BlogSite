import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../blog.services';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';




@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule],
  providers: [BlogService, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent {
  
 
  model = { password: ''}

  constructor(private blogService: BlogService, private router: Router) { }

  login() {
    this.blogService.login(this.model.password).subscribe(
      (response) => {
        if (response == 200) {
          console.log("selam")
          this.router.navigate(['/control-panel']);
        } else {
          this.router.navigate(['/login']);
        }
      },
    
    );
  }
}