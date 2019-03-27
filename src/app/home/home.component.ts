import { AccountComponent } from './../account/account.component';
import { UserRole } from './../enum/user-role.enum';
import { RecordService } from './../service/record.service';
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { HttpBaseService } from '../shared/http-base.service';
import { AuthenticationService } from '../service/authentication.service';
import { UserModel } from '../model/user.model';
import { RecordModel } from '../model/record.model';
import { RecordComponent } from '../record/record.component';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public isHome = true;
  public isCreate = false;
  public isAnalytics = false;

  public isNight = false;

  public isLoading = false;
  public user: UserModel;

  public userRole = UserRole;
  @ViewChild(RecordComponent) recordComponent: RecordComponent;

  constructor(private httpBaseService: HttpBaseService,
    private authenticationService: AuthenticationService,
    public overlay: Overlay,
    public viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.user = this.authenticationService.currentUserValue;
  }

  onAccount() {
    const config = new OverlayConfig({
      hasBackdrop: true,
      scrollStrategy: this.overlay.scrollStrategies.block()
    });

    config.positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    config.hasBackdrop = true;

    const overlayRef = this.overlay.create(config);

    overlayRef.backdropClick().subscribe(() => {
      overlayRef.dispose();
    });

    overlayRef.attach(new ComponentPortal(AccountComponent, this.viewContainerRef));
  }

  onNight() {
    this.isNight = !this.isNight;
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
