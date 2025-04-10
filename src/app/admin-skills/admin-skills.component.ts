import { Component } from '@angular/core';
import { SkillsService } from '../services/skills-service/skills.service';
import { Skills } from '../models/skills/skills.model';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-skills',
  templateUrl: './admin-skills.component.html',
  styleUrl: './admin-skills.component.css'
})
export class AdminSkillsComponent {
  btntxt: string = "Update";
    goalText: string = "";
    skills: Skills = new Skills;
   isEditMode: boolean = false;
    editId: string | null = null;
  constructor (public skillsService: SkillsService) {
    this.skillsService.getSkills().snapshotChanges().pipe(
      map(changes => changes.map(c => ({id: c.payload.doc.id, ...c.payload.doc.data()})))
    ).subscribe(data => {
      this.skills = data [0];
      console.log(this.skills);
    });
  }

  updateInterest(id?: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'this action is going to update the skills section ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'

    }).then((result) => {
      if (this.skills && this.skills.id) {
        this.skillsService.updateSkills(this.skills.id, { languagues: this.skills.languagues, Areas: this.skills.Areas });
        
        }
        Swal.fire('Done !', 'all is up to date.', 'success');

    });

  }

}
