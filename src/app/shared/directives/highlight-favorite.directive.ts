import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appHighlightFavorite]',
  standalone: true,
})
export class HighlightFavoriteDirective implements OnChanges {
  @Input('appHighlightFavorite') isFavorite = false;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnChanges() {
    this.el.nativeElement.style.backgroundColor = this.isFavorite ? '#fef9c3' : '';
  }
}
