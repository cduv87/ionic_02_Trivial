import { Answer } from "./answer";

export class Question {

    public Quest: string;
    public Category: string;
    public Difficulty: string;
    public Answers: Answer;

    public constructor(Quest: string, Category: string, Difficulty: string, Correct: string, Reponses : string[]) {
        this.Quest = Quest;
        this.Category = Category;
        this. Difficulty = Difficulty;
        this.Answers = new Answer(Correct, Reponses)
    }


}
