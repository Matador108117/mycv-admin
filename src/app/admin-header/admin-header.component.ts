import { Component } from '@angular/core';
import { HeaderService } from '../services/header-service/header.service';
import { Header } from '../models/header/header.model';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {
  btntxt: string = "Update";
  goalText: string = "";
  header: Header = new Header;
  isEditMode: boolean = false;
  editId: string | null = null;

  constructor (public headerService: HeaderService) {
    this.headerService.getHeader().snapshotChanges().pipe(
      map(changes => changes.map(c => ({id: c.payload.doc.id, ...c.payload.doc.data()})))
    ).subscribe(data => {
      this.header = data [0];
      console.log(this.header);
    });
  }

  updateHeader(id?: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'this action is going to update the header section ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed && this.header && this.header.id) {
        this.headerService.updateHeader(this.header.id, {
          name: this.header.name,
          goalLife: this.header.goalLife,
          photoUrl: this.header.photoUrl,
          email: this.header.email,
          phoneNumber: this.header.phoneNumber,
          location: this.header.location,
          socialNetwork: this.header.socialNetwork
        });
  
        Swal.fire('Done !', 'all is up to date.', 'success');
      }
    });
  }
  
}
