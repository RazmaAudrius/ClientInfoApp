import { Component } from '@angular/core';
import { ClientService } from '../../services/client-info.service';
import { Client } from '../../model/client';
import { CommonModule } from '@angular/common';
import { Router,RouterLink } from '@angular/router';
import { LoadingComponent } from "../loading/loading.component";
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingComponent, FormsModule],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent {
  public clients: Client[] = [];
  public Filteredclients: Client[] = [];
  public isLoading = false;
  public isError = false;
  public filterText: string = '';

  private loadData() {
    this.isLoading = true;
    this.clientService.loadClients().subscribe({
      next: (data) => {
        this.clients = data.sort((a, b) => {         
          return a.lastName.localeCompare(b.lastName);
        });
        this.Filteredclients = this.clients
        this.isLoading = false;
        this.isError = false;
      },
      error: (data) => {
        this.isError = true;
        this.isLoading = false;
      }
    });
  }

  public constructor(private auth: AuthService, private router: Router, private clientService: ClientService) {
    if (auth.idToken == null || auth.idToken == '')
      this.router.navigate(['']);
    this.loadData();

  }

  public deleteClient(id: string | null) {
    if (id != null) {
      this.clientService.deleteClient(id).subscribe(() => {
        this.loadData();
      });
    }

  }
  public filterClients() {    
    const filter = this.filterText.toLowerCase().trim();

    this.Filteredclients = this.clients.filter(client =>
      client.firstName.toLowerCase().includes(filter) ||
      client.lastName.toLowerCase().includes(filter) ||
      client.companyName.toLowerCase().includes(filter) ||
      client.companyAddress.toLowerCase().includes(filter)
    );
    console.log(this.Filteredclients);
  }

}
