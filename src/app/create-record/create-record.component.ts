import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RecordService } from '../service/record.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-record',
  templateUrl: './create-record.component.html',
  styleUrls: ['./create-record.component.scss']
})
export class CreateRecordComponent implements OnInit {

  public createRecordForm: FormGroup;
  public loading = false;
  public submitted = false;
  public returnUrl: string;

  constructor(private router: Router, private formBuilder: FormBuilder,
    private recordService: RecordService) { }

  ngOnInit() {
    this.createRecordForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  get f() { return this.createRecordForm.controls; }

  onCreate() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.createRecordForm.invalid) {
      return;
    }

    console.log('f :', this.f);

    this.loading = true;
    this.recordService.createRecord(this.f.title.value, this.f.content.value)
      .subscribe(
        data => {
          console.log('data :', data);
          // need to reload
          // this.router.navigate(['']);
          this.loading = false;
        },
        error => {
          console.log('error :', error);
          // this.alertService.error(error);
          this.loading = false;
        });
  }

}
