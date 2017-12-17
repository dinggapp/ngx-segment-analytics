import { NgModule, ModuleWithProviders, Optional, SkipSelf, InjectionToken, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SegmentService } from './ngx-segment-analytics.service';
import { SegmentConfig } from './ngx-segment-analytics.config';

/** Segment Configuration Injection Token */
export const SEGMENT_CONFIG: InjectionToken<SegmentConfig> = new InjectionToken<SegmentConfig>('ngx-segment-analytics.config');

/**
 * Window Wrapper for Angular AOT
 */
@Injectable()
export class WindowWrapper extends Window {
    /**
     * Segment Analytics.js instance
     */
    public analytics: any;
}

/**
 * Window Provider for Angular AOT
 * @returns Browser Window instance
 */
export function getWindow() { return window; }

/**
 * Segment Module
 */
@NgModule({
    imports: [CommonModule],
    providers: [
        { provide: WindowWrapper, useFactory: getWindow }
    ]
})
export class SegmentModule {

    /**
     * Segment Module Initialisation
     *
     * @param config Segment Configuration
     * @returns Segment Module
     */
    public static forRoot(config?: SegmentConfig): ModuleWithProviders {
        return {
            ngModule: SegmentModule,
            providers: [
                { provide: SEGMENT_CONFIG, useValue: config },
                SegmentService,
            ],
        };
    }

    /**
     * Segment Module Constructor
     *
     * @param parentModule Must be null
     */
    constructor(@Optional() @SkipSelf() parentModule: SegmentModule) {
        if (parentModule) {
            throw new Error('SegmentModule is already loaded. Import it in the AppModule only');
        }
    }
}
