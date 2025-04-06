import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { WorkExperience } from '../../models/models/work-experience/work-experience.model';
@Injectable({
  providedIn: 'root'
})
export class WorkExperienceService {
  private dbPath = '/Work-experience';
  workExperienceRef: AngularFirestoreCollection<WorkExperience>;

  constructor(private db: AngularFirestore) {
  this.workExperienceRef = db.collection(this.dbPath);

   }  
   
   getWorkExperience(): AngularFirestoreCollection<WorkExperience> {
    return this.workExperienceRef;
   }

   createWorkExperience(myJob: WorkExperience): any {
    return this.workExperienceRef.add({ ...myJob });
   }
   updateEducation(id: string, myWork: WorkExperience): Promise<void> {
    return this.workExperienceRef.doc(id).update({ ...myWork });
  }
   deleteWorkExperience(id? : string): Promise<void> {
    return this.workExperienceRef.doc(id).delete();
   }

 }
