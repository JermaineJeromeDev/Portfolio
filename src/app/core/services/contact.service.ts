import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ContactSubmission {
    name: string;
    email: string;
    message: string;
    privacyAccepted: boolean;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
    private readonly http = inject(HttpClient);
    private readonly formspreeEndpoint = 'https://formspree.io/f/xljepgon';

    submit(data: ContactSubmission): Observable<unknown> {
        return this.http.post(this.formspreeEndpoint, data, {
        headers: { Accept: 'application/json' },
        });
    }
}
