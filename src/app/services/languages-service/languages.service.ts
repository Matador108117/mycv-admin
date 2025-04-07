import { Injectable } from '@angular/core';
import { Languages } from '../../models/languages/languages.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'; 

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {
  dbPath = '/Languages';
  languagesRef: AngularFirestoreCollection<Languages>;
  
  constructor(private db: AngularFirestore) {
    this.languagesRef = db.collection(this.dbPath);
  }
    getLanguages(): AngularFirestoreCollection<Languages> {
      return this.languagesRef;
    }
       createLanguages(myJob: Languages): any {
        return this.languagesRef.add({ ...myJob });
       }
    updateLanguages(id: string, myLanguage: Languages): Promise<void> {
      return this.languagesRef.doc(id).update({ ...myLanguage });
    }
    deleteLanguages(id? : string): Promise<void> {
      return this.languagesRef.doc(id).delete();
     }

  
}
