import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpenTriviaServiceService {

  constructor() { }

 async getQuestionAsync(niveau: string) {

  let apiData = 
  [
    { 
      category: "Entertainment: Japanese Anime & Manga", 
      type: "multiple", 
      difficulty: "easy", 
      question: "In \"Fairy Tail\", what is the nickname of Natsu Dragneel?", 
      correct_answer: "The Salamander", 
      incorrect_answers: ["The Dragon Slayer", "The Dragon", "The Demon"] 
    }, 
    { 
      category: "Entertainment: Video Games", 
      type: "boolean", 
      difficulty: "medium", 
      question: "\"Return to Castle Wolfenstein\" was the only game of the Wolfenstein series where you don\'t play as William \"B.J.\" Blazkowicz", 
      correct_answer: "False", 
      incorrect_answers: ["True"] 
    }
  ]

  return apiData

}



}
