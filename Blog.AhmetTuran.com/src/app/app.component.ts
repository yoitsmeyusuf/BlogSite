import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CardComponent } from './blogcard/blogcard.component';
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { BlogService } from './blog.services';
import { NavbarComponent } from './navbar/navbar.component';
import { TopblogsComponent } from './topblogs/topblogs.component';
import { LatestblogsComponent } from './latestblogs/latestblogs.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, CardComponent,HttpClientModule, NavbarComponent, TopblogsComponent,LatestblogsComponent],
  providers: [BlogService, HttpClient],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
