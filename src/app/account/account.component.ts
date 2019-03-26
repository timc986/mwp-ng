import { Component, OnInit } from '@angular/core';
import { UserModel } from '../model/user.model';
import { AuthenticationService } from '../service/authentication.service';
import { UserRole } from '../enum/user-role.enum';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  public user: UserModel;
  public userRole = UserRole;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.user = this.authenticationService.currentUserValue;
  }

}
