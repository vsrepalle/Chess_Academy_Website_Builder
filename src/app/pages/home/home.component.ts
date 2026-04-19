import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebsiteConfigService } from '../../website-config.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  public configService = inject(WebsiteConfigService);
  public config = this.configService.settings;
  public currentSlide = signal(0);
  private timer: any;

  ngOnInit() {
    this.timer = setInterval(() => this.nextSlide(), 3000);
  }

  nextSlide() {
    if(this.config().heroImages.length > 0) {
      this.currentSlide.update(val => (val + 1) % this.config().heroImages.length);
    }
  }

  bookNow(prog?: string) {
    this.configService.navigateToBooking(prog);
  }

  watchDemo() {
    alert("Video Demo coming soon! Opening Youtube Placeholder...");
    window.open('https://www.youtube.com/results?search_query=chess+for+kids', '_blank');
  }

  ngOnDestroy() { if (this.timer) clearInterval(this.timer); }
}
