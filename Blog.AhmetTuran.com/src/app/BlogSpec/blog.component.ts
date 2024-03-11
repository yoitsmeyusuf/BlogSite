import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../blog.services';

@Component({
  standalone: true,
  selector: 'app-blog',
  templateUrl: 'blogcard.component.html',
  styleUrls: ['./blogcard.component.scss'],

})
export class BlogComponent implements OnInit {
  blogs : any = [];
  blogsrecent: any = [];


  constructor(private blogService: BlogService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.blogService.getBlog(params['id']).subscribe(blog => {
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
        
          // Yayın tarihini "T" karakterine göre ayır ve yıl, ay ve gün kısımlarını al
          const [year, month, day] = blog.publishDate.split("T")[0].split("-");
  
          // Ayı sayıdan isme dönüştür ve blog nesnesine kaydet
          blog.publishDate = `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;
        
        this.blogs = blog;
      });
    });
  }
}