import { Component } from '@angular/core';
import { ClientService } from '../../services/client-info.service';
import { Client } from '../../model/client';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from "../loading/loading.component";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-client-add',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingComponent],
  templateUrl: './client-add.component.html',
  styleUrl: './client-add.component.css'
})
export class ClientAddComponent {
   
  public isLoading = false;
  public isError = false;   
  public firstName: string | null = null;
  public lastName: string | null = null;
  public phone: string | null = null;
  public email: string | null = null;
  public comment: string | null = null;
  public companyName?: string | null = null;
  public companyAddress?: string | null = null;

  public constructor(private auth: AuthService, private ClientService: ClientService, private router: Router) {
    if (auth.idToken == null || auth.idToken == '')
      this.router.navigate(['']);
  }

  public addNewClient(f: NgForm) {

    const tmp: Client = {
      firstName: f.form.value.firstName,
      lastName: f.form.value.lastName,
      phone: f.form.value.phone,
      email: f.form.value.email,
      comment: f.form.value.comment,
      companyName: f.form.value.companyName,
      companyAddress: f.form.value.companyAddress,           
      id: null
    };
    this.isLoading = true;
    this.ClientService.addClients(tmp).subscribe({
      next: () => {
        this.isLoading = false;
        this.isError = false;
        this.router.navigate(["/list"]);
      },
      error: () => {
        this.isError = true;
        this.isLoading = false;
      }
    });

  }

}
