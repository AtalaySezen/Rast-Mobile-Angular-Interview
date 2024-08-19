import { Directive, ElementRef, HostListener, Input, Renderer2, inject } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true
})

export class TooltipDirective {
  @Input('appTooltip') tooltipText: string = "";
  el = inject(ElementRef);
  renderer = inject(Renderer2);
  tooltipElement: HTMLElement | null = null;

  //#region mouseenter ve mouseleave durumunda tooltip çalışır.
  @HostListener('mouseenter') onMouseEnter() {
    this.createTooltip();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.removeTooltip();
  }
  //#endregion

  createTooltip() {
    if (!this.tooltipElement) {
      this.tooltipElement = this.renderer.createElement('span');
      this.renderer.appendChild(this.tooltipElement, this.renderer.createText(this.tooltipText));
      this.renderer.addClass(this.tooltipElement, 'tooltip');
      this.renderer.appendChild(this.el.nativeElement, this.tooltipElement);
    }
  }

  removeTooltip() {
    if (this.tooltipElement) {
      this.renderer.removeChild(this.el.nativeElement, this.tooltipElement);
      this.tooltipElement = null;
    }
  }

}
