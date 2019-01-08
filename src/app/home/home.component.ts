import { RecordService } from './../service/record.service';
import { Component, OnInit } from '@angular/core';
import { HttpBaseService } from '../shared/http-base.service';
import { AuthenticationService } from '../Service/authentication.service';
import { User } from '../model/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public loading = false;
  public user: User;

  constructor(private httpBaseService: HttpBaseService,
    private authenticationService: AuthenticationService,
    private recordService: RecordService) { }

  ngOnInit() {
    this.user = this.authenticationService.currentUserValue;
    this.recordService.getAllRecords().subscribe(
      data => {
        console.log('data :', data);
      },
      error => {
        console.log('error :', error);
        // this.alertService.error(error);
        this.loading = false;
      });
  }

  logout() {
    this.authenticationService.logout();
    console.log('logout');
  }

}
