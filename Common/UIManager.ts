import { ElementsConstants } from "./Constants/ElementsConstants";

export class UIManager {
    private static instance: UIManager;

    private StartComponent: HTMLElement;
    private PlayComponent: HTMLElement;
    private EndComponent: HTMLElement;

    private PlayCounter: HTMLElement;
    private FinalScore: HTMLElement;

    private Counter: number = 0;
    private IntervalId: NodeJS.Timeout;

    private GameStarted: boolean;

    private constructor() {
        this.StartComponent = document.querySelector(".start_container");
        this.PlayComponent = document.querySelector(".play_container");
        this.EndComponent = document.querySelector(".end_container");

        this.PlayCounter = document.getElementById("score_counter");
        this.FinalScore = document.getElementById("score_final");
    }

    public static getInstance(): UIManager {
        if (!UIManager.instance) {
            UIManager.instance = new UIManager();
        }
        return UIManager.instance;
    }

    public playState(): void {
        if (this.GameStarted) {
            return;
        }
        this.Counter = 0;
        this.PlayCounter.innerHTML = "Score: " + this.Counter;
        this.GameStarted = true;
        this.changeComponentStatus(false, this.StartComponent);
        this.changeComponentStatus(true, this.PlayComponent);
        this.changeComponentStatus(false, this.EndComponent);
        setTimeout(() => {
            this.IntervalId = setInterval(() => {
                this.Counter++;
                this.PlayCounter.innerHTML = "Score: " + this.Counter;
            }, 1000);
            
        }, ElementsConstants.SPAWN_TIME);
    }

    public endState(): void {
        clearInterval(this.IntervalId);    
        this.FinalScore.innerHTML = this.Counter.toString();
        this.changeComponentStatus(false, this.PlayComponent);
        this.changeComponentStatus(true, this.EndComponent);
        this.GameStarted = false;
    }

    public addScore(addValue: number): void {
        this.Counter += addValue;
        this.PlayCounter.innerHTML = "Score: " + this.Counter;
    }

    public getScore(): number {
        return this.Counter;
    }

    private changeComponentStatus(newStatus: boolean, component: HTMLElement): void {
        if (newStatus) {
            component.classList.add("active");
            component.classList.remove("inactive");
        }
        else {
            component.classList.add("inactive");
            component.classList.remove("active");
        }
    }
}
