import { HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

export interface Blog {
    postID: string;
    title: string;
    content: string;
    category: string;
    publishDate: string;
    imageURL: string;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {

    private url = 'http://localhost:4000/'; // Replace with your server URL

    constructor(private http: HttpClient) { }


    getBlogs(): Observable<Blog[]> {
        return this.http.get<Blog[]>(this.url+"posts").pipe(
            map(blogs => blogs.map(blog => ({
                postID: blog.postID,
                title: blog.title,
                content: blog.content,
                publishDate: blog.publishDate, // Add the missing property
                imageURL: blog.imageURL, 
                category:blog.category// Add the missing property
            })))
        );
    }

  


}