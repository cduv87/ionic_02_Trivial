import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { OpenTriviaServiceService } from '../open-trivia-service.service';
import { Question } from '../question';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  reponseShow: boolean = true;
  errorMessageShow: boolean = true;
  formulaireShow: boolean = false;
  validformShow: boolean = true;

  question: string = "Pourquoi le poulet a t il traversé la route ?"
  reponses: string[] = ["faim", "soif", "peur"]

  name: string = "";
  level: string = "";
  
  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController, private openTriviaServ: OpenTriviaServiceService) {}

  // validations

  onClickVerif() {
    let errorMessage: string = ""
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
      this.questionLoad();
      this.formulaireShow = true;
      this.validformShow= false;
    }
  }


  // new Question load
  async questionLoad() {
    let listFilms = await this.openTriviaServ.getQuestionAsync(this.level)
    let f = listFilms[0]
    let q: Question = new Question(f.question, f.category, f.difficulty, f.correct_answer, f.incorrect_answers)
    this.question = q.Quest;
    this.reponses = q.Answers.Reponses;
  }
  // reponse

  onClickAnswer(reponse) {
    this.reponseShow = false;
    this.showToast(reponse)
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
      header: 'Your answer is :',
      message: message,
      duration: 5000,
      position: 'bottom'
    });
    toast.present();
  }

}
