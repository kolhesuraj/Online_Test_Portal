import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-test-question',
  templateUrl: './test-question.component.html',
  styleUrls: ['./test-question.component.css'],
})
export class TestQuestionComponent implements OnInit {
  testId: any;
  test: any;
  questions: any[] = [];
  questionNow: number = 0;
  answer: any[][] = [];
  options: any[][] = [];

  constructor(
    private roter: ActivatedRoute,
    private http: HttpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.testId = this.roter.snapshot.paramMap.get('id');
    this.getquestions();
    this.setArray();
    let answerLocal = JSON.parse(localStorage.getItem(this.testId)!);
    let optionsLocal = JSON.parse(localStorage.getItem(this.testId + 'text')!);

    if (answerLocal == null) {
      this.setArray();
    } else {
      this.answer = answerLocal;
      this.options = optionsLocal;
    }
  }

  getquestions() {
    this.http.testData.forEach((element: any) => {
      if (element._id == this.testId) {
        this.test = element;
        this.questions = this.test.questions;
        // console.log(this.test);
      }
    });
  }
  setArray() {
    this.questions.forEach((element, i) => {
      if (element.type) {
        this.answer[i] = [];
        this.options[i] = [];
      }
    });
    // console.log(this.answer)
  }
  record(i: any, option: any) {
    if (this.questions[this.questionNow].type) {
      this.checkans(i, option);
    } else {
      this.answer[this.questionNow] = i;
      this.options[this.questionNow] = option;
    }
    // console.log(this.answer);
    // console.log(this.options);
    localStorage.setItem(this.testId, JSON.stringify(this.answer));
    localStorage.setItem(this.testId + 'text', JSON.stringify(this.options));
  }

  checkans(i: any, option: any) {
    if (this.answer[this.questionNow].includes(i)) {
      let result: any[] = this.answer[this.questionNow].filter((element) => {
        return element != i;        
      });
      let text: any[] = this.options[this.questionNow].filter((element) => {
        return element != option;
      });
      
      this.options[this.questionNow] = text;
      this.answer[this.questionNow] = result;
      
    } else {
      this.answer[this.questionNow].push(i);
      this.options[this.questionNow].push(option);
    }
  }
  navigateTo() {
    if (this.answer.length == this.questions.length) {
      this.router.navigate([`./../result/${this.testId}`]);
    } else {
      alert("please attemp all questions");
    }
  }
}
