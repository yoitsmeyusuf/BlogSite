import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { BlogService } from './blog.services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private blogService: BlogService, private router: Router) { }

  async canActivate(): Promise<boolean> {

    if (await this.blogService.checkToken().toPromise() === true) { 
      console.log();
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}