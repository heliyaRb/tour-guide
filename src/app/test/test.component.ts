import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  width = 0;
  height = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.draw();
    console.log(this.data);
  }

  draw() {
    let canvas = document.getElementById('canvas') as HTMLCanvasElement;
    canvas.width = this.width;
    canvas.height = this.height;
    let context: any = canvas.getContext('2d');

    this.doDraw(context);
  }

  doDraw(context: CanvasRenderingContext2D) {
    context.globalAlpha = 0.3;
    const backgroundPath = new Path2D();
    let controlY = this.height - 100;
    let controlXDelta = this.width / 4;
    backgroundPath.moveTo(0, 0);
    backgroundPath.lineTo(this.width, 0);
    backgroundPath.lineTo(this.width, this.height * 0.7);
    backgroundPath.bezierCurveTo(
      this.width - controlXDelta,
      controlY,
      controlXDelta,
      controlY,
      0,
      this.height * 0.7
    );

    backgroundPath.closePath();
    context.fill(backgroundPath);
    context.fillRect(0, 0, window.innerWidth, window.innerHeight);
    context.globalAlpha = 1;
    context.clearRect(
      this.data.position.left,
      this.data.position.top,
      100,
      100
    );
  }
}
