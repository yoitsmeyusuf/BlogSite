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

    checkToken(): Observable<boolean> {
        const token = sessionStorage.getItem('token');
        const headers = { 'Authorization': `Bearer ${token}` };
        return this.http.get(`${this.url}Auth`, { headers, observe: 'response' }).pipe(
            map((response: HttpResponse<Object>) => {
                // Check the status of the response
                if (response.status === 200) {
                    return true;
                } else if (response.status === 401) {
                    return false;
                }
                // Handle other status codes if necessary
                return false; // Add a default return value
            }),
            catchError((error: any) => {
                console.error(error);
                return of(false);
            })
        );
    }

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

    getBlog(Id: string): Observable<Blog> {
        return this.http.get<Blog>(`${this.url}posts/${Id}`);
    }
    deleteBlog(Id: string): Observable<any> {
        const token = sessionStorage.getItem('token');
        if (!token) {
            console.error('No token');
        }
        const headers = { 'Authorization': `Bearer ${token}` };
        return this.http.delete(`${this.url}posts/delete/${Id}`, { headers, observe: 'response', responseType: 'text' });
    }
    createBlog(title: string, content: string, category: string, imageURL: string): Observable<any> {
        const token = sessionStorage.getItem('token');
        if (!token) {
            console.error('No token');
        }
        const headers = { 'Authorization': `Bearer ${token}` };
        return this.http.post(`${this.url}posts/create`, { title, content, category, imageURL }, { headers, observe: 'response', responseType: 'text' });
    }
    //I want to edit spesific blog data
    editBlog(Id: string, title: string, content: string, category: string, imageURL: string): Observable<any> {
        const token = sessionStorage.getItem('token');
       if (!token) {
            console.error('No token');
        }
        const headers = { 'Authorization': `Bearer ${token}` };
        return this.http.put(`${this.url}posts/update/${Id}`, {title,content,category,imageURL}, { headers, observe: 'response', responseType: 'text' });
    }
    //make an login function 
    login(password: string): Observable<any> {
        return this.http.post(`${this.url}Auth`, { password }, { observe: 'response', responseType: 'text' })
            .pipe(
                map((response: HttpResponse<any>) => {
                    if (response.status === 200) {
                        //jwt token is stored in local storage
                        sessionStorage.setItem('token', response.body);
                      
                    }
                    return response.status;
                }),
                catchError((error: HttpErrorResponse) => {
                    if (error.status === 401) {
                        // Handle 401 error here
                        // For example, you can return an Observable of a default value
                        return of(401);
                    }
                    // If it's not a 401 error, rethrow the error
                    return throwError(() => error);
                })
            );
    }

        logout() {
        sessionStorage.removeItem('token');
         
        }

     //get the last 3  blog post by publishdate firts make get blogs and make them array and sort them by publish date and slice the first 3
    getRecentBlogs(): Observable<Blog[]> {
        return this.getBlogs().pipe(
            map(blogs => blogs.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()).slice(0, 3))
        );}
  

}