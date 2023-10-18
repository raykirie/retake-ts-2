
interface Logger {
    log(message: string): void;
  }
  
  
  class LogToConsole implements Logger {
    log(message: string): void {
      console.log(message);
    }
  }
  
  
  class Plotter {
    private positionX: number;
    private positionY: number;
    private isCarriageDown: boolean;
    private lineColor: string;
    private logger: Logger;
  
    constructor(loggerType: new () => Logger) {
      this.positionX = 0;
      this.positionY = 0;
      this.isCarriageDown = false;
      this.lineColor = 'Black';
      this.logger = new loggerType();
    }
  
    move(distance: number): void {
      const newX = this.positionX + distance * Math.cos(this.positionY * (Math.PI / 180));
      const newY = this.positionY + distance * Math.sin(this.positionY * (Math.PI / 180));
      this.logger.log(`Перемещаемся на ${distance} в направлении ${this.positionY} градусов.`);
      this.logger.log(`...Чертим линию из (${this.positionX}, ${this.positionY}) в (${newX}, ${newY}) используя ${this.lineColor} цвет.`);
      this.positionX = newX;
      this.positionY = newY;
    }
  
    turn(degrees: number): void {
      this.logger.log(`Поворачиваем на ${degrees} градусов.`);
      this.positionY += degrees;
    }
  
    carriageDown(): void {
      this.logger.log('Опускаем каретку');
      this.isCarriageDown = true;
    }
  
    carriageUp(): void {
      this.logger.log('Поднимаем каретку');
      this.isCarriageDown = false;
    }
  
    setColor(color: string): void {
      this.logger.log(`Устанавливаем ${color} цвет линии.`);
      this.lineColor = color;
    }
  }
  
  function drawTriangle(plt: Plotter, size: number): void {
    plt.setColor('Green');
    for (let i = 0; i < 3; ++i) {
      plt.carriageDown();
      plt.move(size);
      plt.carriageUp();
      plt.turn(120.0);
    }
  }
  
  const plotter = new Plotter(LogToConsole);
  drawTriangle(plotter, 100.0);
  