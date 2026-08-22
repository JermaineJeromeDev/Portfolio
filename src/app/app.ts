import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ScreenRotateComponent } from './components/screen-rotate/screen-rotate';
import { HeaderComponent } from './layout/header/header';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ScreenRotateComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  protected readonly title = signal('portfolio');

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'de']);
    this.translate.setFallbackLang('en');

    const browserLang = this.translate.getBrowserLang() ?? 'en';
    this.translate.use(browserLang === 'de' ? 'de' : 'en');
  }
}
