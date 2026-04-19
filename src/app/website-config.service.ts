import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export interface Coach { name: string; title: string; photo: string; }
export interface Stat { label: string; value: string; }
export interface Program { level: string; title: string; age: string; description: string; }

export interface AcademyConfig {
  name: string;
  brandName: string;
  heroTitle: string;
  heroSubtext: string;
  heroImages: string[];
  primaryColor: string;
  address: string;
  phone: string;
  email: string;
  missionTitle: string;
  missionText: string;
  stats: Stat[];
  coaches: Coach[];
  programs: Program[];
}

@Injectable({ providedIn: 'root' })
export class WebsiteConfigService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private STORAGE_KEY = 'chess_academy_v3_config';
  
  public settings = signal<AcademyConfig>(this.loadSettings());

  private loadSettings(): AcademyConfig {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    return saved ? JSON.parse(saved) : this.getDefaults();
  }

  public navigateToBooking(programName?: string) {
    this.router.navigate(['/contact'], { queryParams: { program: programName } });
  }

  public applyConfig(newConfig: AcademyConfig) {
    this.settings.set(newConfig);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newConfig));
  }

  public loadPreset(filename: string) {
    this.http.get<AcademyConfig>(`assets/configs/${filename}`).subscribe(data => this.applyConfig(data));
  }

  public downloadJSON() {
    const blob = new Blob([JSON.stringify(this.settings(), null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = `${this.settings().name.toLowerCase().replace(/\s+/g, '-')}.json`;
    a.click();
  }

  private getDefaults(): AcademyConfig {
    return {
      name: "Royal Chess Academy", brandName: "ROYAL",
      heroTitle: "Build Smart Minds.", heroSubtext: "Premium coaching for future Grandmasters.",
      heroImages: ["assets/images/slide1.jpg", "assets/images/slide2.jpg"],
      primaryColor: "yellow-500", address: "77 Strategy Plaza, City Center, PIN 600001",
      phone: "+91 98765 43210", email: "info@royalchess.com",
      missionTitle: "Our Mission", missionText: "Cultivating logic and patience in the next generation.",
      stats: [{ label: 'Students', value: '1000+' }, { label: 'Champions', value: '50+' }],
      coaches: [
        { name: "R. Viswanathan", title: "Grandmaster", photo: "https://i.pravatar.cc/150?u=1" },
        { name: "S. Williams", title: "FIDE Master", photo: "https://i.pravatar.cc/150?u=2" }
      ],
      programs: [{ level: "01", title: "Pawn Mastery", age: "5-7", description: "Basics." }]
    };
  }
}
