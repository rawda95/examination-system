import { Student } from '../student';
import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  student: Student;

  constructor(private stdentService: StudentService) { }

  getstd() {
    this.stdentService.getstd(25).subscribe(
      retsult => {
        console.log(retsult);
        this.student = retsult.student;
        console.log(this.student);
      }

    );

  }
  ngOnInit() {
    this.getstd();
  }


}
