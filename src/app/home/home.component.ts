import { Component, OnInit } from '@angular/core';
import { HttpBaseService } from '../shared/http-base.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private httpBaseService: HttpBaseService) { }

  ngOnInit() {
    // this.httpBaseService.Get('http://fairhuman.co.uk/api/products').subscribe(
    //   (data) => {
    //     console.log('data :', data);
    //   },
    //   error => {
    //     console.log('error :', error);
    //   });
  }

}
