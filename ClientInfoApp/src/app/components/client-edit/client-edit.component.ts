import { Component } from '@angular/core';
import { ClientService } from '../../services/client-info.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from "../loading/loading.component";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-client-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingComponent],
  templateUrl: './client-edit.component.html',
  styleUrl: './client-edit.component.css'
})
export class ClientEditComponent {

  public isLoading = false;
  public isError = false;
  public id: string;
  public firstName: string | null = null;
  public lastName: string | null = null;
  public phone: string | null = null;
  public email: string | null = null;
  public comment: string | null = null;
  public companyName?: string | null = null;
  public companyAddress?: string | null = null;

  constructor(private auth: AuthService, private route: ActivatedRoute, private router: Router, private eventsService: ClientService) {
    this.id = this.route.snapshot.params["id"];
    this.eventsService.loadClient(this.id).subscribe((client) => {
      this.firstName = client.firstName;
      this.lastName = client.lastName;
      this.phone = client.phone;
      this.email = client.email;
      this.comment = client.comment;
      this.companyName = client.companyName;
      this.companyAddress = client.companyAddress;     
      this.isLoading = false;
      if (auth.idToken == null || auth.idToken == '')
        this.router.navigate(['']);
    });
  }

  public updateRecord(f: NgForm) {
    this.isLoading = true;
    this.eventsService.updateClient({
      id: this.id,
      firstName: f.form.value.firstname,
      lastName: f.form.value.lastName,
      phone: f.form.value.phone,
      email: f.form.value.email,
      comment: f.form.value.comment,
      companyName: f.form.value.companyName,
      companyAddress: f.form.value.companyAddress,

    }).subscribe({
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
