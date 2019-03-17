import {HttpInterceptor, HttpRequest, HttpHandler,HttpEvent} from "@angular/common/http/http"
import{ Observable } from 'rxjs'; 
import { tap } from 'rxjs/operators';
import{ Injectable } from "@angular/core"
import {Router} from "@angular/router"

@Injectable()

export class AuthInterceptor implements HttpInterceptor{
   
    constructor(private router: Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        if(req.headers.get('No-Auth') == 'True')
        return next.handle(req.clone());

        var token = localStorage.getItem('TokenInfo');
        if(localStorage.getItem('TokenInfo') != null)
        {
            const clonedReq= req.clone({
               
                headers : req.headers.set("Authorization", "Bearer " + token.substring(10, token.length - 2))
            });

            return next.handle(clonedReq)
            .pipe(tap(
                succ => { },
                err => 
                {
                    debugger;
                    if(err.status == 401)
                    {
                        this.router.navigateByUrl('/login');
                    }
                }
            ));
        }

    }

}