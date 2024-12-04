import { Vector2 } from "./Vector2";

export class Transform{
    private Size: Vector2;
    private Position: Vector2;
    private Velocity: Vector2;
    private Color: string;

    constructor() {
        this.Size = new Vector2(0, 0);
        this.Position = new Vector2(0, 0);
        this.Velocity = new Vector2(0, 0);
    }

    public getSize(): Vector2 {
        return this.Size;
    }

    public setSize(newSize: Vector2): void {
        this.Size = newSize;
    }

    public getPosition(): Vector2 {
        return this.Position;
    }

    public setPosition(newPos: Vector2): void {
        this.Position = newPos;
    }

    public getVelocity(): Vector2 {
        return this.Velocity;
    }

    public setVelocity(newVelocity: Vector2): void {
        this.Velocity = newVelocity;
    }

    public getColor(): string {
        return this.Color;
    }
    
    public setColor(newColor: string): void {
        this.Color = newColor;
    }

    public collide(other: Transform): boolean {
        const thisPos = this.Position;
        const thisSize = this.Size;
        const otherPos = other.getPosition();
        const otherSize = other.getSize();
        return (
            thisPos.X < otherPos.X + otherSize.X &&
            thisPos.X + thisSize.X > otherPos.X &&
            thisPos.Y < otherPos.Y + otherSize.Y &&
            thisPos.Y + thisSize.Y > otherPos.Y
        );
    }
}