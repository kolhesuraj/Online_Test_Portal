import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  testData: any;
  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.getData().subscribe({
      next: (res: any) => {
        // console.log(res);
        this.testData = res.tests;
        this.httpService.testData = this.testData;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
