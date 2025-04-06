import { Component } from '@angular/core';
import { WorkExperienceService } from '../services/work-experience-service/work-experience.service';
import { WorkExperience } from '../models/models/work-experience/work-experience.model';
import {map} from 'rxjs/operators';
@Component({
  selector: 'app-admin-workexperience',
  templateUrl: './admin-workexperience.component.html',
  styleUrl: './admin-workexperience.component.css'
})
export class AdminWorkexperienceComponent {
  itemCount : Number = 0; 
  btntxt: string = "Agregar";
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
      // Si está en modo edición, actualiza el elemento
      this.WorkExperienceService.updateEducation(this.editId, this.myWorkExperience).then(() => {
        console.log('Updated item successfully!');
        this.resetForm();
      });
    } else {
      // Si no, crea un nuevo elemento
      this.WorkExperienceService.createWorkExperience(this.myWorkExperience).then(() => {
        console.log('Created new item successfully!');
        this.resetForm();
      });
    }
}

updateJob(id?: string) {
  const jobToEdit = this.workExperience.find(job => job.id === id);
  if (jobToEdit) {
    this.myWorkExperience = { ...jobToEdit }; // Cargamos los datos en el formulario
    this.btntxt = "Actualizar";
    this.isEditMode = true;
    this.editId = id || null;
  }
}
deleteJob( id? : string) {
this.WorkExperienceService.deleteWorkExperience(id).then(() => {
  console.log('Deleted item successfully!');
});
console.log(id); 
}
resetForm() {
  this.myWorkExperience = new WorkExperience();
  this.btntxt = "Agregar";
  this.isEditMode = false;
  this.editId = null;
}

}
