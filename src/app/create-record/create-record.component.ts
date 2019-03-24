import { Feeling } from './../enum/feeling.enum';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RecordService } from '../service/record.service';
import { Router } from '@angular/router';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-create-record',
  templateUrl: './create-record.component.html',
  styleUrls: ['./create-record.component.scss']
})
export class CreateRecordComponent implements OnInit {

  public createRecordForm: FormGroup;
  public isLoading = false;
  public submitted = false;
  public returnUrl: string;
  @Output() reload: EventEmitter<null> = new EventEmitter();

  constructor(private router: Router, private formBuilder: FormBuilder,
    private recordService: RecordService,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.createRecordForm = this.formBuilder.group({
      title: [{ value: '', disabled: false }, Validators.required],
      content: [{ value: '', disabled: false }, Validators.required],
      feeling: [{ value: '3', disabled: false }]
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

    this.isLoading = true;
    this.createRecordForm.disable();
    this.recordService.createRecord(this.f.title.value, this.f.content.value, this.f.feeling.value)
      .subscribe(
        data => {
          console.log('data :', data);
          this.reload.emit();
          this.createRecordForm.reset();
          this.submitted = false;
          this.isLoading = false;
          this.createRecordForm.enable();
          this.notificationService.success('Successfully created record');
        },
        error => {
          console.log('error :', error);
          this.notificationService.error('Failed');
          // this.alertService.error(error);
          this.isLoading = false;
          this.createRecordForm.enable();
        });
  }

  formatFeeling(value: number | null) {
    if (!value) {
      return 0;
    }

    const feelingName = Feeling[value];

    return feelingName;

    // switch (value) {
    //   case 1: {
    //     return 'very unhappy';
    //   }
    //   case 2: {
    //     return 'unhappy';
    //   }
    //   case 3: {
    //     return 'so so';
    //   }
    //   case 4: {
    //     return 'happy';
    //   }
    //   case 5: {
    //     return 'very happy';
    //   }
    //   default: {
    //     return 'so so';
    //   }
    // }
  }
}
