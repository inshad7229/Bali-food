import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

constructor(private router: Router) {}

    canActivate() {
    	console.log('hihihihihihihihihihi')
         if (localStorage.getItem('adminLogin')) {
            return true;
        }
        this.router.navigate(['/login'],{skipLocationChange:false});
        return false;
    }
}
