import { Transform } from "../RenderComponents/Transform";
import { Player } from "../Player";
import { Canvas } from "../RenderComponents/Canvas";
import { Vector2 } from "../RenderComponents/Vector2";
import { ElementsConstants } from "../Constants/ElementsConstants";
import { CanvasConstants } from "../Constants/CanvasConstants";
import { IRenderable } from "../Interfaces/IRenderable";

export abstract class Element implements IRenderable {
    protected Transform: Transform = new Transform(); 
    protected Player: Player = new Player();
    protected Canvas: Canvas;

    constructor() {
        this.Transform.setColor(ElementsConstants.UNKNOWN_COLOR);
    }

    public render(): void {
        this.Canvas = Canvas.getInstance();
        if (this.Transform.collide(this.Player.getTransform())) {
            this.onCollision();
        }
        this.draw();
    }

    protected onCollision(): void {
         console.log("A collision with an element has occur.");
    }

    protected draw() {
        const renderingContext = this.Canvas.getCanvasRenderingContext();
        const objPos = this.Transform.getPosition();
        const objSize = this.Transform.getSize();
        const objColor = this.Transform.getColor();

        renderingContext.lineWidth = 2;
        renderingContext.strokeStyle = objColor;

        renderingContext.strokeRect(objPos.X, objPos.Y, objSize.X, objSize.Y);
    }

    protected spawn() {
        const randomSizeNumber = this.getRandomNumber(ElementsConstants.MIN_SIZE, ElementsConstants.MAX_SIZE);
        const objSize = new Vector2(randomSizeNumber, randomSizeNumber);
        this.Transform.setSize(objSize);

        const randomPosX = this.getRandomNumber(1, CanvasConstants.WIDTH - objSize.X);
        const randomPosY = this.getRandomNumber(1, CanvasConstants.HEIGHT - objSize.Y);
        const objPosition = new Vector2(randomPosX, randomPosY);
        this.Transform.setPosition(objPosition);
    }

    protected getRandomNumber(number1: number, number2: number) : number{
        return (Math.floor(Math.random() * (number2 - number1)) + number1);
    }
}