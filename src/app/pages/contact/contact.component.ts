import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { WebsiteConfigService } from '../../website-config.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit {
  public config = inject(WebsiteConfigService).settings;
  private route = inject(ActivatedRoute);

  formData = { name: '', email: '', phone: '', program: '', message: '' };
  submitted = false;

  ngOnInit() {
    // Auto-fill program if coming from a specific card
    this.route.queryParams.subscribe(params => {
      if (params['program']) {
        this.formData.program = params['program'];
      }
    });
  }

  onSubmit() {
    if(this.formData.name && this.formData.email) {
      this.submitted = true;
      console.log('Lead Captured:', this.formData);
      // In a real app, send to API here
    } else {
      alert("Please fill in your name and email.");
    }
  }
}
