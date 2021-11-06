import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TestComponent } from 'src/app/test/test.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'tour-test';
  itemHeight: number = 0;
  itemWidth: number = 0;
  items: string[] = ['.item-1', '.item-2', '.item-3', '.item-4', '.item-5'];
  curentItem: number = 0;

  @ViewChild('item') item: any;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.findItem(this.curentItem);
  }

  findItem(currenvtItem: number) {
    let div = document.querySelector(this.items[currenvtItem]);
    let divOffset = this.offset(div);
    this.itemWidth = this.item.nativeElement.offsetWidth;
    this.itemHeight = this.item.nativeElement.offsetHeight;

    let dialogRef = this.dialog.open(TestComponent, {
      width: '100%',
      height: '100%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'class-test',
      data: {
        position: { top: divOffset.top, left: divOffset.left },
        item: { width: this.itemWidth, height: this.itemHeight },
        value: div?.innerHTML,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result?.onNext == true) {
        this.curentItem++;
        this.findItem(this.curentItem);
      }
    });
  }

  offset(el: any) {
    let rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft,
    };
  }
}
