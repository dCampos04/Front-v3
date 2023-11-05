import { Component, Directive, OnInit} from '@angular/core';
import { QuestionService } from "../../service/question.service";
import { interval, timeout} from "rxjs";



@Component({
  selector: 'app-body-question',
  templateUrl: './body-question.component.html',
  styleUrls: ['./body-question.component.css']
})
export class BodyQuestionComponent implements OnInit {

  public nameStudent: String = "";
  public questionList: any = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  counter = 120;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  interval$: any;
  progress: string = "0";
  isQuizCompleted: boolean = false;
  qscli: boolean = false;
  hasAnswered: boolean = false;

  constructor(private questionService: QuestionService) {
  }

  ngOnInit(): void {
    this.nameStudent = localStorage.getItem("nameStudent")!;
    this.getAllQuestions();
    this.startCounter();
  }

  getAllQuestions() {
    this.questionService.getQuestionJson()
      .subscribe(res => {
        this.questionList = res.questions;
      })
  }
  qsValide() {
    this.qscli = false;
  }

  nextQuestion() {
    this.hasAnswered = false;
    this.currentQuestion++;

    this.getProgressPorcent();
    if (this.currentQuestion===this.questionList.length) {
        this.isQuizCompleted = true;
      this.stopCounter();
    }
  }

  previusQuestion() {
    this.currentQuestion--;
    this.getProgressPorcent();
   }

  answer(currentQno: number, option: any) {
    this.getProgressPorcent();
    if (!this.hasAnswered) {
      this.hasAnswered = true;
      if (option.correct && !this.qscli) {
        this.qscli = true;
        this.points += 4;
        this.correctAnswer++;
      } else {
        this.inCorrectAnswer++;
        this.qscli = true;
      }
      if (currentQno === this.questionList.length) {
        setTimeout(() => {
          this.isQuizCompleted = true;
        }, 1000);
        this.stopCounter();
      }
    }

  }

  startCounter() {
    this.qscli = false;
    this.interval$ = interval(1000)
      .subscribe(val => {
        this.counter--;
        if (this.counter === 0) {
          this.currentQuestion++;
          this.getProgressPorcent();
          //this.updateProgress();
          this.counter = 120;
          this.points -= 0;
          if (this.currentQuestion===this.questionList.length) {
            this.isQuizCompleted = true;
            this.stopCounter();
          }
        }
      });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000)
  }

  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }

  resetCounter() {
    this.stopCounter();
    this.counter = 120;
    this.startCounter();
  }

  resetQuiz() {
    this.resetCounter();
    this.getAllQuestions();
    this.points = 0;
    this.counter = 120;
    this.currentQuestion = 0;
    this.progress = "0";
  }

  getProgressPorcent() {
    this.progress = ((this.currentQuestion / this.questionList.length) * 100).toString();
    return this.progress;
  }

  updateProgress() {
    if (this.currentQuestion >= this.questionList.length) {
      this.isQuizCompleted = true;
      this.stopCounter();
    } else {
      //this.getProgressPorcent();
    }
  }
  endQuiz(){
    this.isQuizCompleted = true;
  }


}