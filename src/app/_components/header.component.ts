import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountService } from '@app/_services';
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

  constructor(private accountService: AccountService, private modalService: ModalService, private router: Router)
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
    this.accountService.logout();
  }
}
