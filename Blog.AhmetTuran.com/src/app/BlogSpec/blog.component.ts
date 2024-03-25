import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../blog.services';
import { LatestblogsComponent } from '../latestblogs/latestblogs.component';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ElementRef, Renderer2 } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-blog',
  imports: [CommonModule, LatestblogsComponent],
  providers: [],
  templateUrl: 'blogcard.component.html',
  styleUrls: ['./blogcard.component.scss'],

})
export class BlogComponent implements OnInit {
  blogs: any = [];
  blogsrecent: any = [];
  baslik: any = [];
  public href: string = "";
  timeSincePublished: string = '';

  removeHyphens(text: string): string {
    //make first letter uppercase and replace - with space
    text = text.charAt(0).toUpperCase() + text.slice(1);
    return text.replace(/-/g, ' ');
  }




  constructor(private router: Router, private sanitizer: DomSanitizer, private blogService: BlogService, private route: ActivatedRoute, private elementRef: ElementRef, private renderer: Renderer2,) { }
  setupSmoothScroll() {
    const links = this.elementRef.nativeElement.querySelectorAll('.headers_container_domain');
  
    links.forEach((link: any) => {
      link.addEventListener('click', (event: any) => {
        event.preventDefault();
  
        const target = link.getAttribute('href');
        const targetElement = document.querySelector(target);
  
        if (targetElement) {
          const offset = window.innerHeight / 2; // Adjust the offset to make the target element appear in the middle of the page
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
  
          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
      });
    });
  }
  transformContent(content: string): SafeHtml {
    // Create a new DOMParser
    let parser = new DOMParser();

    // Parse the content string into a DOM object
    let doc = parser.parseFromString(content, 'text/html');

    // Select all h1 elements
    let h1s = doc.querySelectorAll('h1');

    // For each h1 element
    h1s.forEach(h1 => {
      // Get the inner text and convert it to a valid class name format
      let className = h1.innerText.toLowerCase().replace(/[^a-z0-9çğıöşü]/g, '-');

      // Set the class of the h1 element to the generated class name
      h1.id = className;
    });

    // Serialize the modified DOM back into a string
    let newContent = doc.body.innerHTML;

    // Return the sanitized HTML
    return this.sanitizer.bypassSecurityTrustHtml(newContent);
  }
  ngOnInit(): void {
    this.href = this.router.url;
    this.route.params.subscribe(params => {
      this.blogService.getBlog(params['id']).subscribe(blog => {

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

        this.setupSmoothScroll();
        // get content from blog.content and change all the h1 tags and make them class names same as inner texts

        this.blogService.getUser(blog.author).subscribe((data: any) => {
          blog.author = data.username;
        });
        blog.content = this.transformContent(blog.content) as string;


        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(blog.content, 'text/html');
        const h1s = htmlDoc.querySelectorAll('h1');

        h1s.forEach(h1 => {
          if (h1.textContent) {
            let modifiedText = h1.textContent.toLowerCase().replace(/[^a-z0-9çğıöşü]/g, '-');


            this.baslik.push(modifiedText);
          }
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

const [year, month, day] = blog.publishDate.split("T")[0].split("-");

// Ayı sayıdan isme dönüştür
const monthName = months[parseInt(month) - 1];

// Yayınlanma tarihi formatını oluştur
const formattedPublishDate = `${parseInt(day)} ${monthName} ${year}`;

// Ek olarak, gün ve saat geçişini hesapla
const publishedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
const currentDate = new Date();
const timeDifference = currentDate.getTime() - publishedDate.getTime();
const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
const hoursDifference = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

// Blog nesnesine tarihleri güncelle
blog.publishDate = formattedPublishDate;
this.timeSincePublished = `${daysDifference} gün ${hoursDifference} saat önce`;


        this.blogs = blog;
      });
    });
  }
}