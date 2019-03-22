import { UserRole } from './../enum/user-role.enum';
import { RecordService } from './../service/record.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpBaseService } from '../shared/http-base.service';
import { AuthenticationService } from '../service/authentication.service';
import { UserModel } from '../model/user.model';
import { RecordModel } from '../model/record.model';
import { RecordComponent } from '../record/record.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public isHome = true;
  public isCreate = false;
  public isAnalytics = false;

  public isLoading = false;
  public user: UserModel;

  public userRole = UserRole;
  @ViewChild(RecordComponent) recordComponent: RecordComponent;

  constructor(private httpBaseService: HttpBaseService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.user = this.authenticationService.currentUserValue;
  }

  logout() {
    this.authenticationService.logout();
    console.log('logout');
  }
  reloadRecord() {
    // this.recordComponent.reload();
    this.onHome();
  }

  onHome() {
    this.isHome = true;
    this.isCreate = false;
    this.isAnalytics = false;
  }

  onCreate() {
    this.isHome = false;
    this.isCreate = true;
    this.isAnalytics = false;
  }

  onAnalytics() {
    this.isHome = false;
    this.isCreate = false;
    this.isAnalytics = true;
  }

}
