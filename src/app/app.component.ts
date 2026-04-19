import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { WebsiteConfigService } from './website-config.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html'
})
export class AppComponent {
  // We inject the service and make it PUBLIC so the HTML can access its methods
  public configService = inject(WebsiteConfigService);
  
  // We also keep a shorthand reference to the settings signal
  public config = this.configService.settings;
}
