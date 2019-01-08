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

  public loading = false;
  public user: UserModel;
  public records: RecordModel[] = [];

  constructor(private httpBaseService: HttpBaseService,
    private authenticationService: AuthenticationService,
    private recordService: RecordService) { }

  ngOnInit() {
    this.user = this.authenticationService.currentUserValue;
    this.recordService.getAllRecords().subscribe(
      data => {
        if (data && data.records) {
          console.log('data :', data);
          data.records.forEach(element => {
            this.records.push(element);
          });
        }
        console.log('this.records :', this.records);
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
