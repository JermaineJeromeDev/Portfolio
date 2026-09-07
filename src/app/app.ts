import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScreenRotateComponent } from './components/screen-rotate/screen-rotate';
import { LanguageService } from './core/services/language.service';
import { SeoService } from './core/services/seo.service';
import { Footer } from './layout/footer/footer';
import { HeaderComponent } from './layout/header/header';

/** Root component that initializes global language and SEO services. */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, Footer, ScreenRotateComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  protected readonly title = signal('portfolio');
  private readonly languageService = inject(LanguageService);
  private readonly seoService = inject(SeoService);

  constructor() {
    this.languageService.initialize();
    this.seoService.initialize();
  }
}
