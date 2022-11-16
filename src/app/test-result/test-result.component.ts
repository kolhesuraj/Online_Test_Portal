import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.css'],
})
export class TestResultComponent implements OnInit {
  result: any[] = [];
  testId: any;
  test: any[] = [];
  correct: number = 0;
  incorrect: number = 0;
  constructor(private roter: ActivatedRoute, private http: HttpService) {}

  ngOnInit(): void {
    this.testId = this.roter.snapshot.paramMap.get('id');
    this.result = JSON.parse(localStorage.getItem(this.testId)!);
    this.getquestions();
    // console.log(this.result);
    localStorage.removeItem(this.testId);
    localStorage.removeItem(this.testId + 'text');
    this.checkAnswer();
  }
  getquestions() {
    this.http.testData.forEach((element: any) => {
      if (element._id == this.testId) {
        this.test = element.questions;
        // console.log(this.test);
      }
    });
  }

  checkAnswer() {
    this.test.forEach((element: any, i) => {
      if (element.type) {
        if (element.correctOptionIndex.lenght == this.result[i].lenght) {
          let correctIndex = element.correctOptionIndex.sort();
          let answerIndex = this.result[i].sort();
          if (JSON.stringify(correctIndex) === JSON.stringify(answerIndex)) {
            this.correct++;
            console.log(correctIndex+" correct ele  "+ answerIndex)
          } else {
            this.incorrect++;
            console.log(correctIndex + ' incorect ele  ' + answerIndex);

          }
        } else {
          this.incorrect++;
        }
      } else {
        if (element.correctOptionIndex == this.result[i]) {
          this.correct++;
          console.log(element.correctOptionIndex +" correct "+ this.result[i]);
        } else {
          this.incorrect++;
          console.log(element.correctOptionIndex +" incorret "+ this.result[i]);

        }
      }
    });
    // console.log(this.correct);
    // console.log(this.incorrect);
  }
}
