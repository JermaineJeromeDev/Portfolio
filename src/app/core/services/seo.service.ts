import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter, tap } from 'rxjs';

/** Updates document metadata for the active route and language. */
@Injectable({ providedIn: 'root' })
export class SeoService {
    private readonly meta = inject(Meta);
    private readonly router = inject(Router);
    private readonly title = inject(Title);
    private readonly translate = inject(TranslateService);

    /** Starts metadata updates for navigation, language changes, and the initial route. */
    initialize(): void {
        this.router.events
        .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
        .pipe(tap((event) => this.updateForRoute(event.urlAfterRedirects).subscribe()))
        .subscribe();

        this.translate.onLangChange.subscribe(() => {
            this.updateForRoute(this.router.url).subscribe();
        });

        this.updateForRoute(this.router.url).subscribe();
    }

    /** Resolves and applies SEO translations for a route. */
    private updateForRoute(url: string) {
        const routeKey = url.startsWith('/legal-notice') ? 'LEGAL' : 'HOME';
        return this.translate
            .get([`SEO.${routeKey}_TITLE`, `SEO.${routeKey}_DESCRIPTION`])
            .pipe(tap((translations) => {
                const title = translations[`SEO.${routeKey}_TITLE`];
                const description = translations[`SEO.${routeKey}_DESCRIPTION`];

                this.title.setTitle(title);
                this.meta.updateTag({ name: 'description', content: description });
                this.meta.updateTag({ property: 'og:title', content: title });
                this.meta.updateTag({ property: 'og:description', content: description });
            }));
    }
}
