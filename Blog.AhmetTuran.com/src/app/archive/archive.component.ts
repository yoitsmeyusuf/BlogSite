import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.services';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-archive',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './archive.component.html',
  styleUrl: './archive.component.css'
})
export class ArchiveComponent implements OnInit {
  uniqueYears: { [key: string]: any[] } = {};

  constructor(private blogService: BlogService) {
  }

  ngOnInit() {
    this.blogService.getBlogs().subscribe(blogs => {
      const currentDate = new Date(); // Şu anki tarihi al
      const months = [
        "Oca",
        "Şub",
        "Mar",
        "Nis",
        "May",
        "Haz",
        "Tem",
        "Ağu",
        "Eyl",
        "Eki",
        "Kas",
        "Ara"
      ];

      this.uniqueYears = blogs.reduce((acc: { [key: string]: any[] }, blog) => {
        let years = blog.publishDate.match(/\d{4}/);
        if (years) {
          let year = years[0];
          if (!acc[year]) {
            acc[year] = [];
          }
          acc[year].push(blog);
        }
        return acc;
      }, {});
      let yearsArray = Object.keys(this.uniqueYears).map(Number).sort((a, b) => b - a);

      // Tersine çevrilen anahtarlar kullanılarak uniqueYears nesnesini yeniden oluştur
      let reversedUniqueYears: { [key: string]: any[] } = {};
      yearsArray.forEach(year => {
        reversedUniqueYears[year.toString()] = this.uniqueYears[year.toString()];
      });

      this.uniqueYears = reversedUniqueYears;


      // Blogları döngüyle işle ve her birinin yayın tarihini güncelle
      blogs.forEach((blog: any) => {
        // Yayın tarihini "T" karakterine göre ayır ve yıl, ay ve gün kısımlarını al
        const [year, month, day] = blog.publishDate.split("T")[0].split("-");

        // Ayı sayıdan isme dönüştür ve blog nesnesine kaydet
        blog.publishDate = `${parseInt(day)} ${months[parseInt(month) - 1]} `;
      });





    });


  }
}