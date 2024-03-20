import { Component } from '@angular/core';
import { BlogService, User } from '../blog.services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-latestblogs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './latestblogs.component.html',
  styleUrl: './latestblogs.component.scss'
})
export class LatestblogsComponent {
  constructor(private blogService: BlogService) { }
  blogsrecent: any = [];
  name!: User;
  ngOnInit(): void {
    

      this.blogService.whoami().subscribe((data: any) => {
        
        return this.name = data;
      });
    
      
    this.blogService.getRecentBlogs().subscribe(blogs => {
      blogs.forEach((blog: any) => {
        blog.publishDate = blog.publishDate.split("T")[0];
      });
      const months = [
        "Ocak",
        "Şubat",
        "Mart",
        "Nisan",
        "Mayıs",
        "Haziran",
        "Temmuz",
        "Ağustos",
        "Eylül",
        "Ekim",
        "Kasım",
        "Aralık"
      ];

      // Blogları döngüyle işle ve her birinin yayın tarihini güncelle
      blogs.forEach((blog) => {
        // Yayın tarihini "T" karakterine göre ayır ve yıl, ay ve gün kısımlarını al
        const [year, month, day] = blog.publishDate.split("T")[0].split("-");

        // Ayı sayıdan isme dönüştür ve blog nesnesine kaydet
        blog.publishDate = `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;
      });

      this.blogsrecent = blogs
    })
  }

}
