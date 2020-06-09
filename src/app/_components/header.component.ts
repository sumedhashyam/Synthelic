import { Component, OnInit } from '@angular/core';
import { AccountService } from '@app/_services';
import { ModalService } from '@app/_modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit 
{
  public userLoggedIn: boolean;

  constructor(accountService: AccountService, private modalService: ModalService, private router: Router)
  {
    this.userLoggedIn = accountService.userValue !== null && accountService.userValue !== undefined;
  }

  ngOnInit(): void
  {
  }

  openModal()
  {
    // Because we don't want to show filter for other cases
    let route = this.router.url.replace(/\//g, '');
    switch (route.toLowerCase())
    {
      case 'experiences':
        this.modalService.open('filterModal');
        break;

      case 'trends':
        this.modalService.open('filterModal');
        break;
    }
  }
}
