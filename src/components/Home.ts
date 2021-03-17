import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import {Hello} from "../shared/dtos";
import {client} from "../shared";

@Component({ template:`
<div>
    <!--container-->
        <section class="container">

            <!--questionBox-->
            <div class="questionBox" id="app">

                <!-- transition -->
                <transition :duration="{ enter: 500, leave: 300 }" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut" mode="out-in">

                    <!--qusetionContainer-->
                    <div class="questionContainer" v-if="questionIndex<quiz.questions.length" v-bind:key="questionIndex">

                        <header>
                            <h1 class="title is-6">VueQuiz</h1>
                            <!--progress-->
                            <div class="progressContainer">
                                <progress class="progress is-info is-small" :value="(questionIndex/quiz.questions.length)*100" max="100">{{(questionIndex/quiz.questions.length)*100}}%</progress>
                                <p>{{(questionIndex/quiz.questions.length)*100}}% completo</p>
                            </div>
                            <!--/progress-->
                        </header>

                        <!-- questionTitle -->
                        <h2 class="titleContainer title">{{ quiz.questions[questionIndex].text }}</h2>

                        <!-- quizOptions -->
                        <div class="optionContainer">
                            <div class="option" v-for="(response, index) in quiz.questions[questionIndex].responses" @click="selectOption(index)" :class="{ 'is-selected': userResponses[questionIndex] == index}" :key="index">
                                {{ index | charIndex }}. {{ response.text }}
                            </div>
                        </div>

                        <!--quizFooter: navigation and progress-->
                        <footer class="questionFooter">

                            <!--pagination-->
                            <nav class="pagination" role="navigation" aria-label="pagination">

                                <!-- back button -->
                                <a class="button" v-on:click="prev();" :disabled="questionIndex < 1">
                            Back
                        </a>

                                <!-- next button -->
                                <a class="button" :class="(userResponses[questionIndex]==null)?'':'is-active'" v-on:click="next();" :disabled="questionIndex>=quiz.questions.length">
                            {{ (userResponses[questionIndex]==null)?'Skip':'Next' }}
                        </a>

                            </nav>
                            <!--/pagination-->

                        </footer>
                        <!--/quizFooter-->

                    </div>
                    <!--/questionContainer-->

                    <!--quizCompletedResult-->
                    <div v-if="questionIndex >= quiz.questions.length" v-bind:key="questionIndex" class="quizCompleted has-text-centered">

                        <!-- quizCompletedIcon: Achievement Icon -->
                        <span class="icon">
                        <i class="fa" :class="score()>3?'fa-check-circle-o is-active':'fa-times-circle'"></i>
                    </span>

                        <!--resultTitleBlock-->
                        <h2 class="title">
                            You did {{ (score()>7?'an amazing':(score()<4?'a poor':'a good')) }} job!
                        </h2>
                        <p class="subtitle">
                            Total score: {{ score() }} / {{ quiz.questions.length }}
                        </p>
                            <br>
                            <a class="button" @click="restart()">restart <i class="fa fa-refresh"></i></a>
                        <!--/resultTitleBlock-->

                    </div>
                    <!--/quizCompetedResult-->

                </transition>

            </div>
            <!--/questionBox-->

        </section>
    <!--/container-->

</div>`})
export class Home extends Vue {
    public result: string = '';
    public questionIndex: any = 0;
    public isActive: any = false;
    public userResponses: any = [];
    public quiz: any = {
        user: "Agetic",
        questions: [
           {
              text: "¿Plato tipico de La Paz?",
              responses: [
                 { text: "Mondongo" },
                 { text: "Plato Paceño", correct: true },
                 { text: "Silpancho" },
                 { text: "Menudito" }
              ]
           },
           {
              text: "¿Cuanto es 1 + 1?",
              responses: [
                 { text: "2", correct: true },
                 { text: "10" },
                 { text: "11" },
                 { text: "1" }
              ]
           },
           {
              text: "¿Cual es la mitad de 2 + 1?",
              responses: [
                 { text: "1.5" },
                 { text: "2", correct: true },
                 { text: "1" },
                 { text: "3" }
              ]
           },
           {
              text: "Nuestro pais esta ubicado en _________",
              responses: [
                 { text: "Sudamerica", correct: true },
                 { text: "Centro América" },
                 { text: "Europa"},
                 { text: "Australia" }
              ]
           }
        ]
     };
     
    @Watch('quiz')
    async onNameChanged(value: string, oldValue: string) {
        // userResponses = Array(quiz.questions.length).fill(null);
        await this.nameChanged(value);
    }

    charIndex(i: number) {
        return String.fromCharCode(97 + i);
    }

    async nameChanged(name: string) {
        if (name) {
            const r = await client.get(new Hello({ name }));
            this.result = r.result;
        } else {
            this.result = '';
        }
    }
}
