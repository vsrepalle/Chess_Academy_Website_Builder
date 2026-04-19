import { Component, inject, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { WebsiteConfigService } from '../../website-config.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  public configService = inject(WebsiteConfigService);
  private sanitizer = inject(DomSanitizer);
  
  public config = this.configService.settings;
  public currentSlide = signal(0);
  private timer: any;

  // FIXED: Using computed signal. 
  // This will ONLY re-run if config().address changes.
  // It will NOT re-run when the currentSlide() changes.
  public mapUrl = computed(() => {
    const address = encodeURIComponent(this.config().address);
    const url = `https://maps.google.com/maps?q=${address}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  });

  ngOnInit() {
    this.timer = setInterval(() => this.nextSlide(), 3000);
  }

  nextSlide() {
    const total = this.config().heroImages.length;
    if(total > 0) {
      this.currentSlide.update(val => (val + 1) % total);
    }
  }

  bookNow(prog?: string) {
    this.configService.navigateToBooking(prog);
  }

  watchDemo() {
    window.open('https://www.youtube.com/results?search_query=chess+for+kids', '_blank');
  }

  ngOnDestroy() { if (this.timer) clearInterval(this.timer); }
}
