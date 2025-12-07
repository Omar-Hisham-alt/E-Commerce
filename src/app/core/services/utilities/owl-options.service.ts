import { OwlOptions } from 'ngx-owl-carousel-o';

export function getOwlOptions(options?: OwlOptions, autoplay?: OwlOptions): OwlOptions {
  return {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoplay: autoplay?.autoplay ? autoplay?.autoplay : false,
    autoplaySpeed: 1450,
    autoplayTimeout: 1500,
    slideTransition: 'linear',
    navText: ['', ''],
    items: options?.items ? options?.items : 0,
    responsive: options?.responsive ? options?.responsive : {},
    nav: false,
  };
}
