import { ElementsConstants } from "./Constants/ElementsConstants";
import { Random } from "./GameComponents/Random";
import { Player } from "./Player";
import { Canvas } from "./RenderComponents/Canvas";
import { Escape } from "./GameComponents/Escape";
import { Chase } from "./GameComponents/Chase";
import { UIManager } from "./UIManager";
import { IRenderable } from "./Interfaces/IRenderable";

export class GameManager {
    private Renderables: IRenderable[];
    private StartButton: HTMLElement;
    private ReplayButton: HTMLElement;

    private IntervalId: NodeJS.Timeout;

    constructor() {
        this.StartButton = document.querySelector(".start_container");
        this.ReplayButton = document.querySelectorAll(".end_generic_component")[1] as HTMLElement;
    }

    public createSession(): void{
        this.StartButton.addEventListener("click", () => {
            this.play();
        });
        this.ReplayButton.addEventListener("click", () => {
            this.play();
        });
    }

    private play() {
        if (this.IntervalId != null) {
            clearInterval(this.IntervalId);
        }
        this.Renderables = [];
        const player = new Player();
        this.Renderables.push(player);
        for (var i = 0; i < 3; i++) {
            const random = new Random();
            const escape = new Escape();
            const chase = new Chase();

            this.Renderables.push(random);
            this.Renderables.push(escape);
            this.Renderables.push(chase);
        }
        var uiManager = UIManager.getInstance();
        uiManager.playState();
        const canvas = Canvas.getInstance();
        this.IntervalId = setInterval(() => {
            canvas.clear();
            this.Renderables.forEach(renderable => renderable.render());
        }, 5);
    }
}
