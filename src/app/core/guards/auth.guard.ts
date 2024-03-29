import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';

@Injectable({
  providedIn: 'root'
})
class AuthGuard{
  constructor(private accountService: AccountService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>{
      return this.accountService.currentUser$.pipe(
        map( auth=> {
          if(auth) return true;
          else{
            this.router.navigate(['/account/login'], {queryParams: {returnUrl: state.url}});
            return false;
          }
        })
      );
    }
}

export const IsAuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
  ): Observable<boolean> => {
  return inject(AuthGuard).canActivate(route,state);
};
