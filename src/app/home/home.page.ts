import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { DataService } from '../data.service';
import { OpenTriviaServiceService } from '../open-trivia-service.service';
import { Question } from '../question';
import { RandomService } from '../random.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  listQs : any;
  score : number = 0;
  AnswerEd : boolean = false;
  questionIterator : number;
  restartShow: boolean = true;
  nextShow: boolean = true;
  errorMessageShow: boolean = true;
  formulaireShow: boolean = false;
  validformShow: boolean = true;
  q: Question;
  question: string = "Pourquoi le poulet a t il traversé la route ?"
  reponses: string[] = ["faim", "soif", "peur"]
  name: string = "";
  level: string = "";
  
  constructor(private dataSrv: DataService, private alertCtrl: AlertController, private toastCtrl: ToastController, private openTriviaServ: OpenTriviaServiceService, private randServ: RandomService) {}

  // validations et init list questions

  async onClickVerif() {
    
    let errorMessage: string = "";
    let error: boolean = false;
    if(this.name.length < 3) {
      this.errorMessageShow = false;
      errorMessage += "Name must be 3 characters minimum. ";
      error = true;
    }
    if(this.level.length == 0) {
      this.errorMessageShow = false;
      errorMessage += "You must choose a level. ";
      error = true;
    }
    if(error == true) {
      this.showAlert(errorMessage);
    }
    if(this.level.length > 0 && this.name.length >= 3) {
      this.questionIterator = 0;
      this.listQs = await this.dataSrv.questionlistLoad(this.level);
      this.questionLoad();
      this.formulaireShow = true;
      this.validformShow= false;
    }
  }

  
  // new question from list
  questionLoad() {
    let q1 = this.listQs[this.questionIterator];
    this.q = new Question(q1.question, q1.category, q1.difficulty, q1.correct_answer, q1.incorrect_answers);
    this.question = this.q.Quest;
    // this.reponses = this.q.Answers.Reponses;
    this.reponses = this.randServ.insertRandomly(this.q.Answers.Correct, this.q.Answers.Reponses);
    this.questionIterator++;
  }

  // reponse

  onClickAnswer(reponse) {
    
    if(reponse == this.q.Answers.Correct) {
      this.score++;
    }
    console.log(this.listQs.length)
    console.log(this.questionIterator)
    if(this.listQs.length == this.questionIterator)  {
      this.restartShow = false;
    } else {
      this.nextShow = false;
    }
    
    this.showToast(this.score)
    
  }

  // next question

  onClickNextQuestion() {
    this.questionLoad();
    this.AnswerEd = false;
    this.nextShow = true;
  
  }

  // alert

  async showAlert(message) {
    const alert = await this.alertCtrl.create({
      cssClass: 'custom-alert',
      header: "Invalid input !",
      message: message,
      buttons: ['Ok'],
    });
    alert.present();
  }

  // toast

  async showToast(message) {
    const toast = await this.toastCtrl.create({
      header: 'Your score is :',
      message: message,
      duration: 5000,
      position: 'bottom'
    });
    toast.present();
  }


}
