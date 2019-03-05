import { Feeling } from './../enum/feeling.enum';
import { Component, OnInit, Input } from '@angular/core';
import { RecordService } from '../service/record.service';
import { RecordModel } from '../model/record.model';
import { ResourceLoader } from '@angular/compiler';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {
  public records: RecordModel[] = [];
  public feeling = Feeling;
  public isLoading = false;

  constructor(private recordService: RecordService) { }

  ngOnInit() {
    this.load();
  }

  public load() {
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

  public reload() {
    this.records = [];
    this.load();
  }

  public delete(recordId: number) {
    console.log('recordId :', recordId);
    this.recordService.deleteRecord(recordId).subscribe(
      data => {
        this.reload();
      },
      error => {
        console.log('error :', error);
      }
    );
  }

}
