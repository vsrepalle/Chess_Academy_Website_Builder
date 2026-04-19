import { Component, inject } from '@angular/core';
import { WebsiteConfigService } from '../../website-config.service';
@Component({ selector: 'app-about', standalone: true, templateUrl: './about.component.html' })
export class AboutComponent { public config = inject(WebsiteConfigService).settings; }
