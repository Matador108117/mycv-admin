import { Component } from '@angular/core';
import { LanguagesService } from '../services/languages-service/languages.service';
import { Languages } from '../models/languages/languages.model';
import { map } from 'rxjs'; 
@Component({
  selector: 'app-admin-languages',
  templateUrl: './admin-languages.component.html',
  styleUrl: './admin-languages.component.css'
})
export class AdminLanguagesComponent {
  itemCount : Number = 0; 
  btntxt: string = "Agregar";
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
   
      this.languagesService.updateLanguages(this.editId, this.myLanguages).then(() => {
        console.log('Updated item successfully!');
        this.resetForm();
      });
    } else {
   
      this.languagesService.createLanguages(this.myLanguages).then(() => {
        console.log('Created new item successfully!');
        this.resetForm();
      });
    }
}

updateJob(id?: string) {
  const jobToEdit = this.languages.find(job => job.id === id);
  if (jobToEdit) {
    this.myLanguages = { ...jobToEdit }; 
    this.btntxt = "Actualizar";
    this.isEditMode = true;
    this.editId = id || null;
  }
}
deleteJob( id? : string) {
this.languagesService.deleteLanguages(id).then(() => {
  console.log('Deleted item successfully!');
});
console.log(id); 
}



  resetForm() {
  this.myLanguages = new Languages();
  this.btntxt = "Agregar";
  this.isEditMode = false;
  this.editId = null;
}

}
