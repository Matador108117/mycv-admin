import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import {Education} from '../../models/education/education.model';
@Injectable({
  providedIn: 'root'
})

export class EducationService {
   private dbPath = '/Education';
    educationRef: AngularFirestoreCollection<Education>;
    
  constructor(private db: AngularFirestore) {
    this.educationRef = db.collection(this.dbPath); 
   }
   getEducation() : AngularFirestoreCollection<Education>{
    return this.educationRef; 
   }

    getWorkExperience(): AngularFirestoreCollection<Education> {
       return this.educationRef;
      }
   
      createWorkExperience(myJob: Education): any {
       return this.educationRef.add({ ...myJob });
      }
      updateEducation(id: string, myeducation: Education): Promise<void> {
       return this.educationRef.doc(id).update({ ...myeducation });
     }
      deleteWorkExperience(id? : string): Promise<void> {
       return this.educationRef.doc(id).delete();
      }
}
