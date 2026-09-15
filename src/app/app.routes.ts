import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { LegalNoticeComponent } from './pages/legal-notice/legal-notice';
import { PrivacyPolicy } from './pages/privacy-policy/privacy-policy';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'legal-notice', component: LegalNoticeComponent },
    { path: 'privacy-policy', component: PrivacyPolicy },
    { path: '**', redirectTo: '' }
];
