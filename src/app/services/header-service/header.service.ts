import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Header } from '../../models/header/header.model';
@Injectable({
  providedIn: 'root'
})
export class HeaderService {
dbPath = '/Header';
headerRef: AngularFirestoreCollection<Header>;
  constructor(private db: AngularFirestore) {
    this.headerRef = db.collection(this.dbPath);
   }
   getHeader(): AngularFirestoreCollection<Header> {
      return this.headerRef;
    }
    updateHeader(id : string, data: Partial<Header>): Promise<void> {
      return this.headerRef.doc(id).update(data);
    }
}
