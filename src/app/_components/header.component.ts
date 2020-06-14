import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountService, AlertService } from '@app/_services';
import { ModalService } from '@app/_modal';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy
{
  subscription: Subscription;
  userLoggedIn: boolean;
  username: string;

  constructor(private router: Router, private accountService: AccountService, private modalService: ModalService,
    private alertService: AlertService)
  {
    // subscribe to user observable  
    this.subscription = this.accountService.user.subscribe(user =>
    {
      this.userLoggedIn = user !== null && user !== undefined;
      this.username = user?.username;
    });
  }

  ngOnInit(): void
  {
  }

  ngOnDestroy(): void
  {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  openModal()
  {
    // Show filter for home, trends and experiences page
    let route = this.router.url.replace(/\//g, '').toLowerCase();
    if (route === '' || route === 'trends' || route === 'experiences')
    {
      this.modalService.open('filterModal');
    }
  }

  logOut()
  {

    this.accountService.logout().subscribe({      
      error: err => { this.alertService.error(err); },
      complete: () =>
      {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.accountService.userSubject.next(null);
        this.router.navigate(['signin']);
      }
    });
  }
}
