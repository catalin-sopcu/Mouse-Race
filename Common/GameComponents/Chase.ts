import { Element } from "./Element";
import { Transform } from "../RenderComponents/Transform";
import { Player } from "../Player";
import { Canvas } from "../RenderComponents/Canvas";
import { Vector2 } from "../RenderComponents/Vector2";
import { ElementsConstants } from "../Constants/ElementsConstants";
import { CanvasConstants } from "../Constants/CanvasConstants";
import { UIManager } from "../UIManager";

export class Chase extends Element{
    protected Transform: Transform = new Transform();
    protected Player: Player = new Player();
    protected Canvas: Canvas;

    private CanSpawn: boolean = false;

    private readonly MIN_SPEED: number = 0.2;
    private readonly MAX_SPEED: number = 0.4;

    private static InstanceCount: number = 0;

    constructor() {
        super();
        this.Canvas = Canvas.getInstance();
        Chase.InstanceCount++;
        this.spawn();
        setTimeout(() => {
            this.CanSpawn = true;
            this.Transform.setColor(ElementsConstants.CHASE_COLOR);
        }, ElementsConstants.SPAWN_TIME);
    }

    public override render(): void {
        if (!this.CanSpawn) {
            super.draw();
            return;
        }
        if (this.Transform.collide(this.Player.getTransform())) {
            this.onCollision();
        }
        this.updateTransform();
        this.draw();
    }

    protected override onCollision(): void {
        console.log("A collision with an chase element has occur.");
        var uiManager = UIManager.getInstance();
        uiManager.endState();
    }

    protected override spawn() {
        const randomSizeNumber = this.getRandomNumber(ElementsConstants.MIN_SIZE, ElementsConstants.MAX_SIZE);
        const objSize = new Vector2(randomSizeNumber, randomSizeNumber);
        this.Transform.setSize(objSize);

        const randomPosX = this.getRandomNumber(1, CanvasConstants.WIDTH - objSize.X);
        const randomPosY = this.getRandomNumber(1, CanvasConstants.HEIGHT - objSize.Y);
        const objPosition = new Vector2(randomPosX, randomPosY);
        this.Transform.setPosition(objPosition);

        const randomVelocityX = this.getRandomNumber(this.MIN_SPEED+ (Chase.InstanceCount * 0.05), this.MAX_SPEED );
        const randomVelocityY = this.getRandomNumber(this.MIN_SPEED + (Chase.InstanceCount * 0.05), this.MAX_SPEED );
        const objVelocity = new Vector2(randomVelocityX, randomVelocityY);
        this.Transform.setVelocity(objVelocity);
    }

    protected override draw() {
        const objPos = this.Transform.getPosition();
        const objSize = this.Transform.getSize();
        const objColor = this.Transform.getColor();

        const renderingContext = this.Canvas.getCanvasRenderingContext();
        renderingContext.fillStyle = objColor;
        renderingContext.beginPath();
        renderingContext.moveTo(objPos.X + objSize.X / 4, objPos.Y);
        renderingContext.lineTo(objPos.X + 3 * objSize.X / 4, objPos.Y);
        renderingContext.lineTo(objPos.X + objSize.X, objPos.Y + objSize.Y / 4);
        renderingContext.lineTo(objPos.X + objSize.X, objPos.Y + 3 * objSize.Y / 4);
        renderingContext.lineTo(objPos.X + 3 * objSize.X / 4, objPos.Y + objSize.Y);
        renderingContext.lineTo(objPos.X + objSize.X / 4, objPos.Y + objSize.Y);
        renderingContext.lineTo(objPos.X, objPos.Y + 3 * objSize.Y / 4);
        renderingContext.lineTo(objPos.X, objPos.Y + objSize.Y / 4);
        renderingContext.closePath();
        renderingContext.fill();
    }

    protected updateTransform() {
        const objPos = this.Transform.getPosition();
        const objSize = this.Transform.getSize();
        const objVelocity = this.Transform.getVelocity();

        const playerPos = this.Player.getTransform().getPosition();
        var fixedVelocityX = 0;
        if (objPos.X < playerPos.X) {
            fixedVelocityX = Math.abs(objVelocity.X);
        }
        else {
            fixedVelocityX = -Math.abs(objVelocity.X);
        }

        var fixedVelocityY = 0;
        if (objPos.Y < playerPos.Y) {
            fixedVelocityY = Math.abs(objVelocity.Y);
        }
        else {
            fixedVelocityY = -Math.abs(objVelocity.Y);
        }

        const newVelocity = new Vector2(fixedVelocityX, fixedVelocityY);
        this.Transform.setVelocity(newVelocity);

        var fixedPositionX = objPos.X + newVelocity.X;
        if (fixedPositionX < 0) {
            fixedPositionX = 0;
        }
        else if (fixedPositionX + objSize.X > CanvasConstants.WIDTH) {
            fixedPositionX = CanvasConstants.WIDTH - objSize.X;
        }

        var fixedPositionY = objPos.Y + newVelocity.Y;
        if (fixedPositionY < 0) {
            fixedPositionY = 0;
        }
        else if (fixedPositionY + objSize.Y > CanvasConstants.HEIGHT) {
            fixedPositionY = CanvasConstants.HEIGHT - objSize.Y;
        }

        const newPosition = new Vector2(fixedPositionX, fixedPositionY);
        this.Transform.setPosition(newPosition);
    }
}