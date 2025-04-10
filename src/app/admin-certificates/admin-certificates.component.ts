import { Component } from '@angular/core';
import { CertificatesService } from '../services/certificates-service/certificates.service';
import { Certificates } from '../models/certificates/certificates.model';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-certificates',
  templateUrl: './admin-certificates.component.html',
  styleUrl: './admin-certificates.component.css'
})
export class AdminCertificatesComponent {
itemCount : Number = 0; 
  btntxt: string = "Add";
  goalText: string = "";
  certificatess: Certificates[] = [];
  myCertificates: Certificates = new Certificates();
  isEditMode: boolean = false;
  editId: string | null = null;
  constructor
  (public CertificatesService: CertificatesService) {
   
    this.CertificatesService.getCertificates().snapshotChanges().pipe(
      map(changes => changes.map(c => ({id: c.payload.doc.id, ...c.payload.doc.data()})))
    ).subscribe(data => {
      this.certificatess = data;
      console.log(this.certificatess);
    });
  }


  AgregarJob() {
          if (this.isEditMode && this.editId) {
            // Mostrar confirmación antes de actualizar
            Swal.fire({
              title: 'Would you like to update this item ?',
              text: '¿Are you sure you want to save the changes ?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Yes',
              cancelButtonText: 'No'
            }).then((result) => {
              if (result.isConfirmed) {
                this.CertificatesService.updateCertificates(this.editId!, this.myCertificates).then(() => {
                  console.log('Updated item successfully!');
                  Swal.fire('Done !', 'Updated item successfully.', 'success');
                  this.resetForm();
                });
              }
            });
        
          } else {
       
            this.CertificatesService.createCertificates(this.myCertificates).then(() => {
              console.log('Created new item successfully!');
              Swal.fire('Added !', 'The new item was added.', 'success');
              this.resetForm();
            });
          }
        }
  updateJob(id?: string) {
    const jobToEdit = this.certificatess.find(job => job.id === id);
    if (jobToEdit) {
      this.myCertificates = { ...jobToEdit }; 
      this.btntxt = "Redy for update";
      this.isEditMode = true;
      this.editId = id || null;
      console.log('cambio');
    }
  }
  

  deleteJob(id?: string) {
    Swal.fire({
      title: '¿Do you want to delete this item?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.CertificatesService.deleteCertificates(id).then(() => {
          console.log('Deleted item successfully!');
          Swal.fire('Deleted item successfully!', 'The item has been deleted.', 'success');
        });
      }
    });
  }

  resetForm() {
    this.myCertificates = new Certificates();
    this.btntxt = "Add";
    this.isEditMode = false;
    this.editId = null;
  }
}
