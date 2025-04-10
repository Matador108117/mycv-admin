import { Component } from '@angular/core';
import { WorkExperienceService } from '../services/work-experience-service/work-experience.service';
import { WorkExperience } from '../models/models/work-experience/work-experience.model';
import {map} from 'rxjs/operators';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-workexperience',
  templateUrl: './admin-workexperience.component.html',
  styleUrl: './admin-workexperience.component.css'
})
export class AdminWorkexperienceComponent {
  itemCount : Number = 0; 
  btntxt: string = "Add";
  goalText: string = "";
  workExperience: WorkExperience[] = [];
  myWorkExperience: WorkExperience = new WorkExperience();
  isEditMode: boolean = false;
  editId: string | null = null;

  constructor (public WorkExperienceService: WorkExperienceService) {
    this.WorkExperienceService.getWorkExperience().snapshotChanges().pipe(
      map(changes => changes.map(c => ({id: c.payload.doc.id, ...c.payload.doc.data()})))
    ).subscribe(data => {
      this.workExperience = data;
      console.log(this.workExperience);
    });
  }
  
  AgregarJob() {
    if (this.isEditMode && this.editId) {
      // Mostrar confirmación antes de actualizar
      Swal.fire({
        title: 'Would you like to update this experience ?',
        text: '¿Are you sure you want to save the changes ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          this.WorkExperienceService.updateEducation(this.editId!, this.myWorkExperience).then(() => {
            console.log('Updated item successfully!');
            Swal.fire('Done !', 'Updated item successfully.', 'success');
            this.resetForm();
          });
        }
      });
  
    } else {
 
      this.WorkExperienceService.createWorkExperience(this.myWorkExperience).then(() => {
        console.log('Created new item successfully!');
        Swal.fire('Added !', 'The new item was added.', 'success');
        this.resetForm();
      });
    }
  }
  

updateJob(id?: string) {
  const jobToEdit = this.workExperience.find(job => job.id === id);
  if (jobToEdit) {
    this.myWorkExperience = { ...jobToEdit }; 
    this.btntxt = "Ready for update";
    this.isEditMode = true;
    this.editId = id || null;
  }
}
deleteJob(id?: string) {
  Swal.fire({
    title: '¿Do you want to delete this experencie?',
    text: 'This action cannot be undone.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No'
  }).then((result) => {
    if (result.isConfirmed) {
      this.WorkExperienceService.deleteWorkExperience(id).then(() => {
        console.log('Deleted item successfully!');
        Swal.fire('Deleted item successfully!', 'The experiencie has been deleted.', 'success');
      });
    }
  });
}

resetForm() {
  this.myWorkExperience = new WorkExperience();
  this.btntxt = "Add";
  this.isEditMode = false;
  this.editId = null;
}

}
