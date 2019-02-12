import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  @Output() reload: EventEmitter<null> = new EventEmitter();

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
    this.recordService.createRecord(this.f.title.value, this.f.content.value, 1)
      .subscribe(
        data => {
          console.log('data :', data);
          this.loading = false;
          this.reload.emit();
          this.createRecordForm.reset();
          this.submitted = false;
        },
        error => {
          console.log('error :', error);
          // this.alertService.error(error);
          this.loading = false;
        });
  }
}
