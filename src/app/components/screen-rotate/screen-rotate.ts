import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-screen-rotate',
    imports: [NgOptimizedImage],
    templateUrl: './screen-rotate.html',
    styleUrls: ['./screen-rotate.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreenRotateComponent {}