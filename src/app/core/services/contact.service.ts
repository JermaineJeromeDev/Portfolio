import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/** Payload accepted by the Formspree contact endpoint. */
export interface ContactSubmission {
    name: string;
    email: string;
    message: string;
    privacyAccepted: boolean;
}

/** Sends contact form submissions to the configured Formspree endpoint. */
@Injectable({ providedIn: 'root' })
export class ContactService {
    private readonly http = inject(HttpClient);
    private readonly formspreeEndpoint = 'https://formspree.io/f/xljepgon';

    /** Submits validated contact data and returns the server response stream. */
    submit(data: ContactSubmission): Observable<unknown> {
        return this.http.post(this.formspreeEndpoint, data, {
        headers: { Accept: 'application/json' },
        });
    }
}
