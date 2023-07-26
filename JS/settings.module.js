import { Quiz } from "./Quiz.module.js"
export class settings {
    constructor() {
        document.getElementById('startQuiz').addEventListener('click', () => {
            this.startQuestion()
        })
    }
    async startQuestion() {
        const category = document.getElementById('categoryMenu').value
        const diffculty = document.getElementById('difficultyOptions').value
        const numOfQuestions = document.getElementById('questionsNumber').value
        if (numOfQuestions > 0) {
            const result = await this.getQuestion(numOfQuestions, category, diffculty)
            document.getElementById('alertNum1').classList.add('d-none')
            document.getElementById('settings').classList.add('d-none')
            document.getElementById('Quiz').classList.remove('d-none')
            const quiz = new Quiz(result)
        } else {
            document.getElementById('alertNum1').classList.remove('d-none')
        }
    }
    async getQuestion(amount, category, diffculty) {
        const x = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${diffculty}`)
        const y = await x.json()
        return y.results;
    }
}