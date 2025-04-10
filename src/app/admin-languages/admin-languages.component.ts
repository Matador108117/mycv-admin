import { Component, importProvidersFrom } from '@angular/core';
import { LanguagesService } from '../services/languages-service/languages.service';
import { Languages } from '../models/languages/languages.model';
import { map } from 'rxjs';
import Swal from 'sweetalert2'; 
@Component({
  selector: 'app-admin-languages',
  templateUrl: './admin-languages.component.html',
  styleUrl: './admin-languages.component.css'
})
export class AdminLanguagesComponent {
  itemCount : Number = 0; 
  btntxt: string = "Add";
  goalText: string = "";
  languages: Languages[] = [];
  myLanguages: Languages = new Languages();
  isEditMode: boolean = false;
  editId: string | null = null;

constructor (public languagesService: LanguagesService) {
    this.languagesService.getLanguages().snapshotChanges().pipe(
      map(changes => changes.map(c => ({id: c.payload.doc.id, ...c.payload.doc.data()})))
    ).subscribe(data => {
      this.languages = data;
      console.log(this.languages);
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
                this.languagesService.updateLanguages(this.editId!, this.myLanguages).then(() => {
                  console.log('Updated item successfully!');
                  Swal.fire('Done !', 'Updated item successfully.', 'success');
                  this.resetForm();
                });
              }
            });
        
          } else {
       
            this.languagesService.createLanguages(this.myLanguages).then(() => {
              console.log('Created new item successfully!');
              Swal.fire('Added !', 'The new item was added.', 'success');
              this.resetForm();
            });
          }
        }
updateJob(id?: string) {
  const jobToEdit = this.languages.find(job => job.id === id);
  if (jobToEdit) {
    this.myLanguages = { ...jobToEdit }; 
    this.btntxt = "Ready for update";
    this.isEditMode = true;
    this.editId = id || null;
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
        this.languagesService.deleteLanguages(id).then(() => {
          console.log('Deleted item successfully!');
          Swal.fire('Deleted item successfully!', 'The item has been deleted.', 'success');
        });
      }
    });
  }



  resetForm() {
  this.myLanguages = new Languages();
  this.btntxt = "Add";
  this.isEditMode = false;
  this.editId = null;
}

}
