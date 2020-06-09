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

  constructor(accountService: AccountService, private modalService: ModalService, public router: Router)
  {
    this.userLoggedIn = accountService.userValue !== null && accountService.userValue !== undefined;
  }

  ngOnInit(): void
  {
  }

  openModal(route: string)
  {
    route = route.replace(/\//g, '');
    switch (route.toLowerCase())
    {
      case 'experiences':
        break;

      case 'trends':
        this.modalService.open('filterModal');
        break;
    }
  }

  closeModal(id: string)
  {
    this.modalService.close(id);
  }
}
