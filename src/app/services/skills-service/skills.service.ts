import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Skills } from '../../models/skills/skills.model';
@Injectable({
  providedIn: 'root'
})
export class SkillsService {
dbPath = '/Skills';
skillsRef: AngularFirestoreCollection<Skills>; 
  constructor(private db: AngularFirestore) {
   this.skillsRef = db.collection(this.dbPath);
   }
    getSkills(): AngularFirestoreCollection<Skills> {
       return this.skillsRef;
     }
     updateSkills(id: string, data: Partial<Skills>): Promise<void> {
       return this.skillsRef.doc(id).update(data);
     }
}
