import { Component, inject } from '@angular/core';
import { WebsiteConfigService } from '../../website-config.service';
@Component({ selector: 'app-programs', standalone: true, templateUrl: './programs.component.html' })
export class ProgramsComponent { public config = inject(WebsiteConfigService).settings; }
