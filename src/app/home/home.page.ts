import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
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
  
  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController) {}

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
      this.formulaireShow = true;
      this.validformShow= false;
    }
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
