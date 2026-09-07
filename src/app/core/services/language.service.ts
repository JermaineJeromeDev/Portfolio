import { Injectable, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export type SupportedLanguage = 'en' | 'de';

@Injectable({ providedIn: 'root' })
export class LanguageService {
    private readonly translate = inject(TranslateService);
    readonly currentLanguage = signal<SupportedLanguage>('en');

    initialize(): void {
        this.translate.addLangs(['en', 'de']);
        this.translate.setFallbackLang('en');

        const browserLanguage = this.translate.getBrowserLang();
        this.setLanguage(browserLanguage === 'de' ? 'de' : 'en');
    }

    setLanguage(language: SupportedLanguage): void {
        this.translate.use(language);
        this.currentLanguage.set(language);
    }
}
