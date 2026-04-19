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
  // NEW COLOR CONTROLS
  bgColor: string;
  secondaryBgColor: string;
  cardColor: string;
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
  
  private defaultSettings: AcademyConfig = {
    name: "Royal Chess Academy", brandName: "ROYAL",
    heroTitle: "Build Smart Minds.", heroSubtext: "Premium coaching for future Grandmasters.",
    heroImages: ["assets/images/slide1.jpg", "assets/images/slide2.jpg"],
    primaryColor: "#eab308", // Yellow
    bgColor: "#030712",      // Main Black
    secondaryBgColor: "#0f172a", // Dark Blue/Slate
    cardColor: "rgba(255, 255, 255, 0.03)",
    address: "77 Strategy Plaza, Chennai", phone: "+91 98765 43210", email: "info@royalchess.com",
    missionTitle: "Our Mission", missionText: "Cultivating logic and patience.",
    stats: [{ label: 'Students', value: '1000+' }],
    coaches: [{ name: "R. Viswanathan", title: "Grandmaster", photo: "https://i.pravatar.cc/150?u=1" }],
    programs: [{ level: "01", title: "Pawn Mastery", age: "5-7", description: "Basics." }]
  };

  public settings = signal<AcademyConfig>(this.loadSettings());

  private loadSettings(): AcademyConfig {
    const saved = localStorage.getItem('chess_academy_master_config');
    return saved ? JSON.parse(saved) : this.defaultSettings;
  }

  public navigateToBooking(programName?: string) {
    this.router.navigate(['/contact'], { queryParams: { program: programName } });
  }

  public applyConfig(newConfig: AcademyConfig) {
    this.settings.set(newConfig);
    localStorage.setItem('chess_academy_master_config', JSON.stringify(newConfig));
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
}
