import { Injectable, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export type SupportedLanguage = 'en' | 'de';

/** Coordinates the active application language and ngx-translate. */
@Injectable({ providedIn: 'root' })
export class LanguageService {
    private readonly translate = inject(TranslateService);
    readonly currentLanguage = signal<SupportedLanguage>('en');

    /** Registers supported languages and selects the browser language when available. */
    initialize(): void {
        this.translate.addLangs(['en', 'de']);
        this.translate.setFallbackLang('en');

        const browserLanguage = this.translate.getBrowserLang();
        this.setLanguage(browserLanguage === 'de' ? 'de' : 'en');
    }

    /** Changes the active language and updates the shared language signal. */
    setLanguage(language: SupportedLanguage): void {
        this.translate.use(language);
        this.currentLanguage.set(language);
    }
}
