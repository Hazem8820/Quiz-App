export class Quiz {
    constructor(result) {
        this.result = result
        document.getElementById('to').innerText = result.length;
        this.currentIndex = 0;
        this.from = document.getElementById('from');
        this.title = document.getElementById('questionTitle');
        this.content = document.getElementById('questionContent');
        this.alert = document.getElementById('alertNum2');
        this.score = 0;
        this.showQuiz()
        document.getElementById('nextQuestion').addEventListener('click', () => {
            this.nextQuestion()
        })
        document.getElementById('tryAgain').addEventListener('click', () => {
            location.reload()
        })
    }
    showQuiz() {
        this.from.innerText = this.currentIndex + 1
        const currentQuestion = this.result[this.currentIndex]
        this.title.innerText = currentQuestion.question
        this.correctAnswer = currentQuestion.correct_answer;
        const inCorrectAnswer = [...currentQuestion.incorrect_answers];
        const randomNum = Math.ceil(Math.random() * inCorrectAnswer.length)
        inCorrectAnswer.splice(randomNum, 0, this.correctAnswer)

        let answerBox = ``
        for (let i = 0; i < inCorrectAnswer.length; i++) {
            answerBox += `<label class="text-light rounded-pill btn btn-choice mx-1">
            <input type="radio" name="Choice" value="${inCorrectAnswer[i]}"> ${inCorrectAnswer[i]}
        </label>`
        }
        this.content.innerHTML = answerBox
    }
    nextQuestion() {
        const currentAns = document.querySelector('[name="Choice"]:checked')?.value;
        const correctOne = this.result[this.currentIndex].correct_answer
        if (currentAns != undefined) {
            this.currentIndex++;
            this.alert.classList.add('d-none')

            if (this.currentIndex > this.result.length - 1) {
                document.getElementById('Quiz').classList.add('d-none')
                document.getElementById('finish').classList.remove('d-none')
                document.getElementById('finishScore').innerHTML = this.score
            }
            else {
                this.showQuiz()
            }

            if (currentAns == correctOne) {
                setTimeout(() => {
                    document.getElementById('alertNum4').classList.remove('d-none')
                }, 0)
                setTimeout(() => {
                    document.getElementById('alertNum4').classList.add('d-none')
                }, 200)
                this.score++;
            }
            else {
                setTimeout(() => {
                    document.getElementById('alertNum3').classList.remove('d-none')
                }, 0)
                setTimeout(() => {
                    document.getElementById('alertNum3').classList.add('d-none')
                }, 200)
            }
        }
        else {
            this.alert.classList.remove('d-none')
        }
    }
}