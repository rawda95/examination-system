import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { EmailServiceService } from './email-service.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
form: FormGroup;
  constructor( public emailService: EmailServiceService) { }

  ngOnInit() {

    this.form = new FormGroup({
      name: new FormControl(null, {validators: [Validators.required, Validators.minLength(5)]
      }),
      email: new FormControl(null, {validators: [Validators.required, Validators.email]
      }),
      subject: new FormControl(null, {validators: [Validators.required, Validators.minLength(10)]
      }),
      message: new FormControl(null, {validators: [Validators.required, Validators.minLength(20)]
      }),
    });

  }
  onSaveEmail() {
   this.emailService.addEmail(
     this.form.value.name,
     this.form.value.email,
     this.form.value.subject,
     this.form.value.message

   );
   this.form.reset();
  }

  }


