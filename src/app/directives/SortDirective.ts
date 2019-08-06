import {Directive, ElementRef, Input, OnInit, Renderer} from '@angular/core';

@Directive({
  selector: '[sortColumn]'
})

export class SortDirective implements OnInit {
  @Input() users: any[];
  @Input() sortKey: any;
  private toggleSort = false;

  constructor(private el: ElementRef, private renderer: Renderer) {
  }

  ngOnInit() {
    this.renderer.listen(this.el.nativeElement, 'click', (event) => {
      const parentNode = this.el.nativeElement.parentNode;
      const children = parentNode.children;

      if (this.users && this.sortKey) {
        const sortedData: any = this.sortArray();
      }
      this.toggleSort = !this.toggleSort;
    });
  }

  sortArray(): Array<any> {
    const tempArray: Array<any> = this.users;
    tempArray.sort((a, b) => {
      const aKey = a[this.sortKey].name;
      const str1: string = a[this.sortKey].name.toLowerCase();
      const str2: string = b[this.sortKey].name.toLowerCase();
      if (this.toggleSort) {
        if (str1 < str2) {
          return -1;
        }
        if (str1 > str2) {
          return 1;
        }
      } else {
        if (str1 > str2) {
          return -1;
        }
        if (str1 < str2) {
          return 1;
        }
      }
      return 0;
    });
    return tempArray;
  }
}
