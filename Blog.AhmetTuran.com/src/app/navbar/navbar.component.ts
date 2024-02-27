import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  isAdmin: boolean = false; // Varsayılan olarak isAdmin false olarak ayarlandı

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // URL'den alınan parametrelere göre yönlendirmeyi kontrol edin
    this.route.queryParams.subscribe(params => {
      // Eğer URL'de admin parametresi varsa ve değeri true ise isAdmin true olacak
      this.isAdmin = params['admin'] === 'true';
    });
  }

}
