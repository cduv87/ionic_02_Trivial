import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomService {

  constructor() { }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  insertRandomly(correct: string, incorrect: string[]) {
    let i: number = this.getRandomInt(incorrect.length);
    incorrect.splice(i, 0, correct);
    return incorrect;
  }


}
