import { Component } from '@angular/core';
import { InterestsService } from '../services/interests-service/interests.service';
import { Interests } from '../models/interests/interests.model';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-interests',
  templateUrl: './admin-interests.component.html',
  styleUrl: './admin-interests.component.css'
})
export class AdminInterestsComponent {
 itemCount : Number = 0; 
  btntxt: string = "Update";
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
    Swal.fire({
      title: 'Are you sure?',
      text: 'this action is going to update the interest section ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((resutl) => {
      if (this.Interests && this.Interests.id && resutl.isConfirmed) {
        this.interestService.updateInterest(this.Interests.id, { interest: this.Interests.interest });
         Swal.fire('Done !', 'all is up to date.', 'success');
      }

    }); 
    
  }
  
  

}
