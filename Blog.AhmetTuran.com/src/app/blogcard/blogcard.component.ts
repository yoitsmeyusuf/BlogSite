import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TopblogsComponent } from "../topblogs/topblogs.component";
import { FormsModule } from '@angular/forms';
import { BlogService, User } from '../blog.services';
import { KeyValue } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LatestblogsComponent } from '../latestblogs/latestblogs.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  standalone: true,
  selector: 'app-blog',
  templateUrl: 'blogcard.component.html',
  providers: [],
  styleUrls: ['./blogcard.component.scss'],
  imports: [CommonModule, RouterModule, TopblogsComponent, FormsModule, LatestblogsComponent]
})
export class CardComponent implements OnInit {
  allblogs: any = [];
  blogs: any = [];
  blogsrecent: any = [];
  daysAgo: number[] = [];
  alltags: any = []; // Yayınlanalı kaç gün geçtiğini tutacak dizi
  tagcounts: any = [];
  searchTerm: string = '';
  highestCount: number = 0; // Assign an initial value to 'highestCount'
  constructor(private blogService: BlogService, private sanitizer: DomSanitizer) { }
  texts: string[] = [
    "Head Of IT<br>KUMPORT",
    'Digital<br>Transformation<br>Leader',
    'Data<br>Analysis',
    'Algorithms',
    'AI<br>Researcher',
    'Information<br>Security<br>Manager'
  ];

  animatedText: string = '';
  animationStyle: SafeHtml = '';
  count: number = 0;


  name!: User;

  filterBlogs(): void {
    this.blogs = this.allblogs.filter((blog: any) => blog.title.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }
  ngAfterViewInit(): void {
    this.blogService.whoami().subscribe((data: any) => {

      return this.name = data;
    });
  }

  tagValueComparator = (a: KeyValue<string, number>, b: KeyValue<string, number>): number => {
    return b.value - a.value;
  }

  typeText() {
    if (this.texts[this.count].length > this.animatedText.length) {
      this.animatedText += this.texts[this.count][this.animatedText.length];
      this.animationStyle = this.sanitizer.bypassSecurityTrustHtml('typing 0.5s steps(1, end), blink-caret .75s step-end infinite');
      setTimeout(() => this.typeText(), 50);
    } else {
      this.animationStyle = '';
      setTimeout(() => this.deleteText(), 1200);
    }
  }

  deleteText() {
    if (this.animatedText.length > 0) {
      this.animatedText = this.animatedText.slice(0, -1);
      this.animationStyle = this.sanitizer.bypassSecurityTrustHtml('deleting 0.5s steps(1, end), blink-caret .75s step-end infinite');
      setTimeout(() => this.deleteText(), 50);
    } else {
      this.animationStyle = '';
      this.count = (this.count + 1) % this.texts.length;
      setTimeout(() => this.typeText(), 1500);
    }
  }
  ngOnInit(): void {

    this.typeText();


    // use blogservice.getalltags func




    this.blogService.getBlogs().subscribe(blogs => {
      this.blogService.getAllTags().subscribe(tags => {
        this.alltags = tags;
        console.log(this.alltags);

        let tagCounts: { [tag: string]: number } = {};

        this.alltags.forEach((tag: string) => {
          let count = blogs.filter(blog => blog.tags.includes(tag)).length;
          tagCounts[tag] = count;
        });

        this.tagcounts = tagCounts;
        this.highestCount = Math.max(...Object.values(this.tagcounts) as number[]); // Fix: Cast the values to numbers
      });





      blogs.forEach((blog: any) => {
        if (blog.category == "0") {
          blog.category = "Teknoloji";
        }
        else if (blog.category == "1") {
          blog.category = "Bilim";
        }
        else if (blog.category == "2") {
          blog.category = "İşletme";
        }
        else if (blog.category == "3") {
          blog.category = "Diğer";
        }
      });
      // get most viewed 3 blogs
      this.blogsrecent = blogs.sort((a: any, b: any) => b.views - a.views).slice(0, 3);


      blogs.forEach((blog: any) => {
        console.log(blog);
        this.blogService.getUser(blog.author).subscribe((data: any) => {
          blog.author = data.username;
        });
        blog.content = blog.content.replace(/<img[^>]*>/g, '');
        if (blog.content.length > 500) {
          blog.content = blog.content.substring(0, 500) + "...";
        }
      });
      //the times format 2024-02-19T00:00:00.000Z to 2024-02-19
      // Ay isimlerini içeren bir dizi oluştur
      const currentDate = new Date(); // Şu anki tarihi al
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
      blogs.forEach((blog: any) => {
        // Yayın tarihini "T" karakterine göre ayır ve yıl, ay ve gün kısımlarını al
        const [year, month, day] = blog.publishDate.split("T")[0].split("-");

        // Ayı sayıdan isme dönüştür ve blog nesnesine kaydet
        blog.publishDate = `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;
      });

      this.allblogs = blogs;
      this.filterBlogs();
    });



  }


}
