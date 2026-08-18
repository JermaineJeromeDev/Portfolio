import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID, ViewChild } from '@angular/core';
import { ButtonComponent } from "../button/button";

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './hero.html',
  styleUrls: ['./hero.scss'],
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('titleWrapper') titleWrapper!: ElementRef;

  purpleX = 0;
  purpleY = 0;
  cyanX = 0;
  cyanY = 0;

  private resizeObserver?: ResizeObserver;

  constructor(
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      requestAnimationFrame(() => {
        this.calculateBlobPositions();
      });

      this.resizeObserver = new ResizeObserver(() => {
        this.calculateBlobPositions();
      });

      this.resizeObserver.observe(document.body);
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.resizeObserver?.disconnect();
    }
  }

  private calculateBlobPositions(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const titleElement = this.titleWrapper.nativeElement as HTMLElement;
    const heroElement = titleElement.closest('.hero') as HTMLElement | null;

    if (!heroElement) {
      return;
    }

    const textRect = titleElement.getBoundingClientRect();
    const heroRect = heroElement.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const heroWidth = heroRect.width;
    const isLandscapeMobile = windowWidth <= 767 && windowWidth > windowHeight && windowHeight <= 620;

    const textLeftInHero = textRect.left - heroRect.left;
    const textTopInHero = textRect.top - heroRect.top;

    if (windowWidth >= 1024 && windowHeight <= 600) {
      this.purpleX = textLeftInHero - 330;
      this.purpleY = textTopInHero - 130;
      this.cyanX = Math.min(heroWidth - 40, textLeftInHero + textRect.width - 100);
      this.cyanY = textTopInHero - 180;
    }

    else if (isLandscapeMobile) {
      const dynamicLeft = windowWidth >= 1200 ? 380 : 260;

      this.purpleX = textLeftInHero - dynamicLeft;
      this.purpleY = textTopInHero + 600;
      const dynamicRight = windowWidth >= 1200 ? 60 : 120;

      this.cyanX = Math.min(heroWidth - 40, textLeftInHero + textRect.width - dynamicRight);
      this.cyanY = textTopInHero - 20;
    }

    else if (windowWidth >= 1024) {
      if (windowWidth >= 1200 && window.innerHeight < 850) {
        this.purpleX = textLeftInHero - 80;
        this.purpleY = textTopInHero - 220;
        this.cyanX = Math.min(heroWidth - 60, textLeftInHero + textRect.width - 60);
        this.cyanY = textTopInHero - 250;
      }

      else {
        const dynamicLeftOffset = windowWidth >= 1440 ? 560 : 560 - ((1440 - windowWidth) * 0.7);
        const desktopExtraRight = 400;
        const rightCap = Math.min(200, heroWidth * 0.25);

        this.purpleX = textLeftInHero - dynamicLeftOffset;
        this.purpleY = textTopInHero - 300;

        this.cyanX = Math.min(heroWidth - 20, textLeftInHero + textRect.width + desktopExtraRight) - rightCap;
        this.cyanY = textTopInHero - 120;
      }
    }

    else if (windowWidth >= 768) {
      this.purpleX = textLeftInHero - 330;
      this.purpleY = textTopInHero - 300;

      this.cyanX = Math.min(heroWidth - 100, textLeftInHero + textRect.width - 120);
      this.cyanY = textTopInHero - 100;
    }

    else if (windowWidth >= 540) {
      this.purpleX = textLeftInHero - 220;
      this.purpleY = textTopInHero - 200;

      this.cyanX = Math.min(heroWidth - 20, textLeftInHero + textRect.width - 65);
      this.cyanY = textTopInHero - 80;
    }

        else if (windowWidth >= 420) {
      this.purpleX = textLeftInHero - 200; 
      this.purpleY = textTopInHero - 150;

      this.cyanX = Math.min(heroWidth - 80, textLeftInHero + textRect.width - 150);
      this.cyanY = textTopInHero - 5;
    }

    else if (windowWidth >= 360) {
      this.purpleX = textLeftInHero - 200;
      this.purpleY = textTopInHero - 150;

      this.cyanX = Math.min(heroWidth - 60, textLeftInHero + textRect.width - 120);
      this.cyanY = textTopInHero - 20;
    }

    else {
      this.purpleX = textLeftInHero - 150;
      this.purpleY = textTopInHero - 150;

      this.cyanX = Math.min(heroWidth - 40, textLeftInHero + textRect.width - 140);
      this.cyanY = textTopInHero - 10;
    }


    this.cdr.detectChanges();
  }
}
