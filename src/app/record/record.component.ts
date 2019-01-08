import { Component, OnInit } from '@angular/core';
import { RecordService } from '../service/record.service';
import { RecordModel } from '../model/record.model';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {
  public records: RecordModel[] = [];
  public isLoading = false;

  constructor(
    private recordService: RecordService) { }

  ngOnInit() {
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
        this.isLoading = false;
      });
  }

}
