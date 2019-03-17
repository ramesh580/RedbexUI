import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate{
  constructor(private router:Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
   boolean | import("@angular/router").UrlTree 
   | Observable<boolean | import("@angular/router").UrlTree>
    | Promise<boolean | import("@angular/router").UrlTree> 
    {
      if(localStorage.getItem('TokenInfo') != null)
      {
        return true;
      }
      else
      {
        this.router.navigateByUrl('/login');
        return false;
      }
  }
}
