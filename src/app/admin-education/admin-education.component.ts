import { Component } from '@angular/core';
import { Education } from '../models/education/education.model';
import { EducationService } from '../services/education-service/education.service';
import { map } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-education',
  templateUrl: './admin-education.component.html',
  styleUrl: './admin-education.component.css'
})
export class AdminEducationComponent {
 itemCount : Number = 0; 
  btntxt: string = "Add";
  goalText: string = "";
  educations: Education[] = [];
  myeducation: Education = new Education();
  isEditMode: boolean = false;
  editId: string | null = null;
 

    constructor (public educationService: EducationService) {
      this.educationService.getEducation().snapshotChanges().pipe(
        map(changes => changes.map(c => ({id: c.payload.doc.id, ...c.payload.doc.data()})))
      ).subscribe(data => {
        this.educations = data;
        console.log(this.educations);
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
              this.educationService.updateEducation(this.editId!, this.myeducation).then(() => {
                console.log('Updated item successfully!');
                Swal.fire('Done !', 'Updated item successfully.', 'success');
                this.resetForm();
              });
            }
          });
      
        } else {
     
          this.educationService.createWorkExperience(this.myeducation).then(() => {
            console.log('Created new item successfully!');
            Swal.fire('Added !', 'The new item was added.', 'success');
            this.resetForm();
          });
        }
      }

  updateJob(id?: string) {
  const jobToEdit = this.educations.find(job => job.id === id);
  if (jobToEdit) {
    this.myeducation = { ...jobToEdit }; 
    this.btntxt = "ready for update";
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
      this.educationService.deleteWorkExperience(id).then(() => {
        console.log('Deleted item successfully!');
        Swal.fire('Deleted item successfully!', 'The item has been deleted.', 'success');
      });
    }
  });
}

  resetForm() {
    this.myeducation = new Education();
    this.btntxt = "Agregar";
    this.isEditMode = false;
    this.editId = null;
  }




}
