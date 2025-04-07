import { Component } from '@angular/core';
import { CertificatesService } from '../services/certificates-service/certificates.service';
import { Certificates } from '../models/certificates/certificates.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-certificates',
  templateUrl: './admin-certificates.component.html',
  styleUrl: './admin-certificates.component.css'
})
export class AdminCertificatesComponent {
itemCount : Number = 0; 
  btntxt: string = "Agregar";
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
      this.CertificatesService.updateCertificates(this.editId, this.myCertificates).then(() => {
        console.log('Updated item successfully!');
        this.resetForm();
      });
    } else {
      this.CertificatesService.createCertificates(this.myCertificates).then(() => {
        console.log('Created new item successfully!');
        this.resetForm();
      });
    }
  }
  updateJob(id?: string) {
    const jobToEdit = this.certificatess.find(job => job.id === id);
    if (jobToEdit) {
      this.myCertificates = { ...jobToEdit }; 
      this.btntxt = "Actualizar";
      this.isEditMode = true;
      this.editId = id || null;
    }
  }
  deleteJob( id? : string) {
    this.CertificatesService.deleteCertificates(id).then(() => {
      console.log('Deleted item successfully!');
    });
  }

  resetForm() {
    this.myCertificates = new Certificates();
    this.btntxt = "Agregar";
    this.isEditMode = false;
    this.editId = null;
  }
}
