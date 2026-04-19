import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WebsiteConfigService, AcademyConfig } from '../../website-config.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
  private configService = inject(WebsiteConfigService);
  
  public editableConfig!: AcademyConfig;
  public rawJsonString: string = '';

  ngOnInit() {
    this.refreshLocalState();
  }

  refreshLocalState() {
    const current = this.configService.settings();
    if (current) {
      // Deep clone to prevent direct signal mutation during typing
      this.editableConfig = JSON.parse(JSON.stringify(current));
      this.updateRawJsonPreview();
    }
  }

  updateRawJsonPreview() {
    this.rawJsonString = JSON.stringify(this.editableConfig, null, 2);
  }

  // Visual Editor Actions
  save() {
    this.configService.applyConfig(this.editableConfig);
    this.updateRawJsonPreview();
    alert('Academy settings updated successfully!');
  }

  addCoach() {
    this.editableConfig.coaches.push({ 
      name: 'New Coach', 
      title: 'FIDE Instructor', 
      photo: 'https://i.pravatar.cc/150?u=' + Math.random() 
    });
    this.updateRawJsonPreview();
  }

  removeCoach(index: number) {
    this.editableConfig.coaches.splice(index, 1);
    this.updateRawJsonPreview();
  }

  // JSON Raw Editor Actions
  applyRawJson() {
    try {
      const parsed = JSON.parse(this.rawJsonString);
      this.editableConfig = parsed;
      this.configService.applyConfig(parsed);
      alert('Raw JSON data synced to website!');
    } catch (e) {
      alert('Invalid JSON format. Check for syntax errors.');
    }
  }

  // File & Library Operations
  loadLibraryPreset(event: any) {
    const filename = event.target.value;
    if (filename) {
      this.configService.loadPreset(filename);
      setTimeout(() => this.refreshLocalState(), 300);
    }
  }

  exportConfig() {
    this.configService.downloadJSON();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const content = JSON.parse(e.target.result);
        this.editableConfig = content;
        this.configService.applyConfig(content);
        this.updateRawJsonPreview();
        alert('Configuration file imported!');
      };
      reader.readAsText(file);
    }
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.rawJsonString);
    alert('JSON copied to clipboard!');
  }
}
