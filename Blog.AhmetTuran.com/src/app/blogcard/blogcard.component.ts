import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.services';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TopblogsComponent } from "../topblogs/topblogs.component";

@Component({
    standalone: true,
    selector: 'app-blog',
    templateUrl: 'blogcard.component.html',
    providers: [],
    styleUrls: ['./blogcard.component.scss'],
    imports: [CommonModule, RouterModule, TopblogsComponent]
})
export class CardComponent implements OnInit {
  blogs: any = [];
  blogsrecent: any = [];

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {

    this.blogService.getBlogs().subscribe(blogs => {
      //make blogs content only 80 characters and add ... to the end
      // if category is 0 its string Teknoloji, if its 1 its string Bilim, if its 2 its string işletme, if its 3 its string Diğer
      blogs.forEach((blog: any) => {
        if (blog.category == 0) {
          blog.category = "Teknoloji";
        }
        else if (blog.category == 1) {
          blog.category = "Bilim";
        }
        else if (blog.category == 2) {
          blog.category = "İşletme";
        }
        else if (blog.category == 3) {
          blog.category = "Diğer";
        }
      });
      blogs.forEach((blog: any) => {
        if (blog.content.length > 300) {
          blog.content = blog.content.substring(0, 300) + "...";
        }
      });
      //the times format 2024-02-19T00:00:00.000Z to 2024-02-19
      // Ay isimlerini içeren bir dizi oluştur
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

      this.blogs = blogs;
    });



  }


}