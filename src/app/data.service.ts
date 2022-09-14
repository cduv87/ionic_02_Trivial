import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  str: string = '';
  baseUrl: string = "https://opentdb.com/api.php?amount=10&difficulty=";

  constructor(private http: HttpClient) {
    console.log("Data Service");
  }

  questionlistLoad(level: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUrl + level).toPromise().then((result: any) => {
        console.log(result);
        resolve(result.results);
        reject("Impossible de récupérer la liste des questions : vérifiez votre connexion internet.");
      });
    });
  }

}
