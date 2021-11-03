import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TestComponent } from 'src/app/test/test.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'tour-test';

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    var div = document.querySelector('.item-5');
    var divOffset = this.offset(div);
    console.log(divOffset.left, divOffset.top);

    this.dialog.open(TestComponent, {
      width: '100%',
      height: '100%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'class-test',
      data: {
        position: { top: divOffset.top, left: divOffset.left },
        value: div?.innerHTML,
      },
    });
  }

  offset(el: any) {
    var rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft,
    };
  }
}
