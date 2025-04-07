import { Component } from '@angular/core';
import { InterestsService } from '../services/interests-service/interests.service';
import { Interests } from '../models/interests/interests.model';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-admin-interests',
  templateUrl: './admin-interests.component.html',
  styleUrl: './admin-interests.component.css'
})
export class AdminInterestsComponent {
 itemCount : Number = 0; 
  btntxt: string = "Actualizar";
  goalText: string = "";
  Interests: Interests = new Interests;
 isEditMode: boolean = false;
  editId: string | null = null;


   constructor (public interestService: InterestsService) {
     this.interestService.getInterests().snapshotChanges().pipe(
       map(changes => changes.map(c => ({id: c.payload.doc.id, ...c.payload.doc.data()})))
     ).subscribe(data => {
       this.Interests = data [0];
       console.log(this.Interests);
     });
   }
   updateInterest(id?: string): void {
    if (this.Interests && this.Interests.id) {
      this.interestService.updateInterest(this.Interests.id, { interest: this.Interests.interest });
    
    }
  }
  
  

}
