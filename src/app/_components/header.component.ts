import { Component, OnInit } from '@angular/core';

import { AccountService } from '@app/_services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit 
{
  public userLoggedIn: boolean;

  constructor(accountService: AccountService)
  {    
    this.userLoggedIn = accountService.userValue !== null && accountService.userValue !== undefined;
  }

  ngOnInit(): void
  {
  }

}
