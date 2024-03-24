import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService, User } from '../blog.services';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements AfterViewInit {

  isAdmin: boolean = false; // Varsayılan olarak isAdmin false olarak ayarlandı


  constructor(private route: ActivatedRoute, private blogService: BlogService) { }
  name!: User;

  ngAfterViewInit(): void {
    // URL'den alınan parametrelere göre yönlendirmeyi kontrol edin
    this.blogService.whoami().subscribe((data: any) => {

      return this.name = data;
    });
    this.route.queryParams.subscribe(params => {
      // Eğer URL'de admin parametresi varsa ve değeri true ise isAdmin true olacak
      this.isAdmin = params['admin'] === 'true';
    });
  }

}



