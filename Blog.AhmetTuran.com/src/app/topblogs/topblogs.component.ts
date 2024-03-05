import { Component } from '@angular/core';
import { BlogComponent } from "../BlogSpec/blog.component";
import { BlogService } from '../blog.services';
import { CommonModule } from '@angular/common';
import { ElementRef } from '@angular/core';

@Component({
    selector: 'app-topblogs',
    standalone: true,
    templateUrl: './topblogs.component.html',
    styleUrl: './topblogs.component.scss',
    imports: [CommonModule]
})
export class TopblogsComponent{

  

  constructor(private blogservice: BlogService, private elementRef: ElementRef) { }
  blogsrecent :any =[];
  
  ngOnInit():void{
    setInterval(() => {
      this.scrollHorizontally();
    }, 2000); // 2 saniyede bir kaydırma işlemi
    this.blogservice.getRecentBlogs().subscribe(blogs=>{
      
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
        blog.content = blog.content.replace(/<img[^>]*>/g, '');
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
      blogs.forEach((blog: any) => {
        console.log(blog)
        blog.publishDate = blog.publishDate.split("T")[0];
      });this.blogsrecent=blogs})
  }
  scrollHorizontally(): void {
    const container = this.elementRef.nativeElement.querySelector('.blogdomainn');
    if (container) {
      let scrollLeft = container.scrollLeft;
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;
      const scrollAmount = 1000; // Her 2 saniyede ne kadar kaydırılacağını ayarla (örneğin 10px)
  
      const slide = () => {
        scrollLeft += scrollAmount;
        console.log(clientWidth);

        if (scrollLeft > scrollWidth - clientWidth + 700) {
          scrollLeft = 0;
        }
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      };
  
      setInterval(slide, 4000); // 2 saniyede bir kaydırma işlemi yap
  
      // En sona geldiğinde en başa dönmesi gerekiyorsa:
      container.addEventListener('scroll', () => {
        if (container.scrollLeft === scrollWidth - clientWidth + 700) {
          setTimeout(() => {
            container.scrollTo({ left: 0, behavior: 'smooth' });
          }, 500); // Yumuşak geçiş için bir bekleme ekleyebilirsiniz
        }
      });
    }
  
  }







  }


