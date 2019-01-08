import { RecordService } from './../service/record.service';
import { Component, OnInit } from '@angular/core';
import { HttpBaseService } from '../shared/http-base.service';
import { AuthenticationService } from '../Service/authentication.service';
import { UserModel } from '../model/user.model';
import { RecordModel } from '../model/record.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public isLoading = false;
  public user: UserModel;


  constructor(private httpBaseService: HttpBaseService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.user = this.authenticationService.currentUserValue;
  }

  logout() {
    this.authenticationService.logout();
    console.log('logout');
  }

}
