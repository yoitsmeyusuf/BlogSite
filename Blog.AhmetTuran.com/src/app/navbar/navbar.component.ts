import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router, RouterLink } from '@angular/router';
import { BlogService, User } from '../blog.services';
import { BlogComponent } from '../BlogSpec/blog.component';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements AfterViewInit, OnInit {

  isAdmin: boolean = false; // Varsayılan olarak isAdmin false olarak ayarlandı

  constructor(private route: ActivatedRoute, private router: Router,private blogService: BlogService) {

   }
  name!: User;
  // if route is blog/{id} function that returns boolean

  

  

  
ngOnInit(): void {
  
}
  ngAfterViewInit(): void {
    // URL'den alınan parametrelere göre yönlendirmeyi kontrol edin
    this.blogService.whoami().subscribe((data: any) => {

      return this.name = data;
    });
    // 
    this.route.queryParams.subscribe(params => {
      // Eğer URL'de admin parametresi varsa ve değeri true ise isAdmin true olacak
      this.isAdmin = params['admin'] === 'true';
    });
  }

}



