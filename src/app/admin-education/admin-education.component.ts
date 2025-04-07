import { Component } from '@angular/core';
import { Education } from '../models/education/education.model';
import { EducationService } from '../services/education-service/education.service';
import { map } from 'rxjs';
@Component({
  selector: 'app-admin-education',
  templateUrl: './admin-education.component.html',
  styleUrl: './admin-education.component.css'
})
export class AdminEducationComponent {
 itemCount : Number = 0; 
  btntxt: string = "Agregar";
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
     
        this.educationService.updateEducation(this.editId, this.myeducation).then(() => {
          console.log('Updated item successfully!');
          this.resetForm();
        });
      } else {
     
        this.educationService.createWorkExperience(this.myeducation).then(() => {
          console.log('Created new item successfully!');
          this.resetForm();
        });
      }
  }
  updateJob(id?: string) {
  const jobToEdit = this.educations.find(job => job.id === id);
  if (jobToEdit) {
    this.myeducation = { ...jobToEdit }; 
    this.btntxt = "Actualizar";
    this.isEditMode = true;
    this.editId = id || null;
  }
}
deleteJob( id? : string) {
this.educationService.deleteWorkExperience(id).then(() => {
  console.log('Deleted item successfully!');
});
console.log(id); 
}
  resetForm() {
    this.myeducation = new Education();
    this.btntxt = "Agregar";
    this.isEditMode = false;
    this.editId = null;
  }




}
