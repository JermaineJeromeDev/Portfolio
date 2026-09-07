import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * A presentational overlay component that prompts the user to rotate their screen.
 * Typically triggered on mobile or tablet devices when the application requires 
 * a specific orientation (e.g., landscape) for an optimal user experience.
 * 
 * Performance Optimized: Uses `OnPush` change detection and Angular's `NgOptimizedImage`.
 */
@Component({
    selector: 'app-screen-rotate',
    imports: [NgOptimizedImage],
    templateUrl: './screen-rotate.html',
    styleUrls: ['./screen-rotate.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreenRotateComponent {
    
}
