import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  width = 0;
  height = 0;
  percentageOfHeight = 0.8;
  @ViewChild('child') child: any;

  get halfHeight() {
    return this.height / 2;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<TestComponent>
  ) {}

  ngOnInit(): void {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.draw();
  }

  ngAfterViewInit() {
    // right side of page
    if (this.data.position.left > this.width / 2) {
      console.log(this.data.position.left, this.width / 2, 'right');
      if (this.data.position.top > this.halfHeight) {
        console.log(this.data.position.top, this.halfHeight, 'bottom');
        this.child.nativeElement.setAttribute(
          'style',
          `right:${
            this.width - this.data.position.left - this.data.item.width
          }px;max-width:${this.data.position.left + 50}px;bottom:${
            this.data.position.top - this.data.item.height
          }px`
        );
      } else {
        console.log(this.data.position.top, this.halfHeight, 'top');
        this.child.nativeElement.setAttribute(
          'style',
          `right:${
            this.width - this.data.position.left - this.data.item.width
          }px;max-width:${this.data.position.left + 50}px;top:${
            this.data.position.top + this.data.item.height
          }px`
        );
      }
    }

    // left side of page
    if (this.data.position.left <= this.width / 2) {
      console.log(this.data.position.left, this.width / 2, 'left');
      if (this.data.position.top > this.halfHeight) {
        console.log(this.data.position.top, this.halfHeight, 'bottom');
        this.child.nativeElement.setAttribute(
          'style',
          `left:${this.data.position.left}px;max-width:${
            this.width - this.data.position.left - 50
          }px;bottom:${this.data.position.top - this.data.item.height}px`
        );
      } else {
        console.log(this.data.position.top, this.halfHeight, 'top');
        this.child.nativeElement.setAttribute(
          'style',
          `left:${this.data.position.left}px;max-width:${
            this.width - this.data.position.left - 50
          }px;top:${this.data.position.top + this.data.item.height}px`
        );
      }
    }
  }

  draw() {
    let canvas = document.getElementById('canvas') as HTMLCanvasElement;
    canvas.width = this.width - 6;
    canvas.height = this.height - 6;
    let context: any = canvas.getContext('2d');

    this.doBackDrop(context);
    this.doDraw(context);
  }

  doBackDrop(context: CanvasRenderingContext2D) {
    context.globalAlpha = 0.6;
    context.fillStyle = '#A8A8A8';
    let controlY = this.height - 30;
    const backgroundPath = new Path2D();
    backgroundPath.moveTo(0, this.height * this.percentageOfHeight);
    backgroundPath.quadraticCurveTo(
      this.width / 2,
      controlY,
      this.width,
      this.height * this.percentageOfHeight
    );
    backgroundPath.lineTo(this.width, this.height);
    backgroundPath.lineTo(0, this.height);

    backgroundPath.closePath();
    context.fill(backgroundPath);
    context.globalAlpha = 1;
  }

  doDraw(context: CanvasRenderingContext2D) {
    context.globalAlpha = 0.9;
    context.fillStyle = '#01806b';
    const backgroundPath = new Path2D();
    let controlY = this.height - 30;
    backgroundPath.moveTo(0, 0);
    backgroundPath.lineTo(this.width, 0);
    backgroundPath.lineTo(this.width, this.height * this.percentageOfHeight);
    backgroundPath.quadraticCurveTo(
      this.width / 2,
      controlY,
      0,
      this.height * this.percentageOfHeight
    );

    backgroundPath.closePath();
    backgroundPath.arc(100, 75, 50, 0, 2 * Math.PI);

    context.fill(backgroundPath);
    context.globalAlpha = 1;
    context.clearRect(
      this.data.position.left,
      this.data.position.top,
      100,
      100
    );
  }

  onCancle() {
    this.ref.close();
  }

  onNext() {
    this.ref.close({ onNext: true });
  }
}
