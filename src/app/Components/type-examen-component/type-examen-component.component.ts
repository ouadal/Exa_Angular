import { Component, OnInit } from '@angular/core';
import {TypeExamenService} from "../../services/type-examen.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-type-examen-component',
  templateUrl: './type-examen-component.component.html',
  styleUrls: ['./type-examen-component.component.css']
})
export class TypeExamenComponentComponent implements OnInit {
  libele = new FormControl('')
  typeExamens : any = []
  private confirmDeleteModal: any;
  activeTypeExam! : any
  selectedTypExamId !: number | undefined;

  typeExamenForm = new FormGroup({
    libele: this.libele
  });
  constructor(private toastr:ToastrService,private typeExamenService : TypeExamenService,private authenticationService:AuthenticationService,private router:Router) { }

  ngOnInit(): void {
    this.getAllTypeExamen()
    this.authenticationService.getMyInformations().subscribe({
      next:(value:any)=>{
        value.data[0].roles.forEach((el:any)=>{
          if(el.name == "ROLE_USER"){
            this.toastr.warning("vous n'avez pas accès a cette page..")
            this.router.navigateByUrl("/template/Examen")
          }
        })


      },
      error:(err)=>{
        this.toastr.error("vous ne vous etes pas encore connecté")

        this.router.navigateByUrl("/authentication/login")
      }


    })
  }

  addCycle(){
    var data = {
      libele: this.libele.value,
    }
    console.log(data)
    this.typeExamenService.addTypeExamen(data).subscribe({
      next : (value:any) =>{
        console.log('Type examen ajoutée avec succès !')
        this.getAllTypeExamen()
        this.typeExamenForm.reset()

      },
      error:(err)=>{
        console.log(err.message)

      }
    })
  }
  editTypeExamen(id: number | undefined) {
    //@ts-ignore
    this.typeExamenService.getTypeExamenById(id).subscribe(
      (cycle: any) => {
        // Mettre à jour les contrôles du formulaire avec les données existantes
        this.selectedTypExamId = id;
        this.libele.setValue(cycle.libele);
        console.log(this.typeExamenForm.value)
      },
      (error: any) => {
        console.log(error.message);
      }
    );
  }

  saveEditTypExam() {
    // Vérifier si les valeurs du formulaire sont valides
    if (this.typeExamenForm.valid) {
      // Créer l'objet avec les nouvelles valeurs
      const updatedTypeExam = {
        libele: this.libele.value,

      };

      // Appeler le service pour mettre à jour l'année avec les nouvelles valeurs
      this.typeExamenService.editTypeExamen(this.selectedTypExamId, updatedTypeExam).subscribe(
        (value: any) => {
          console.log('Type examen mise à jour avec succès !');
          console.log(value)
          // Réinitialiser le formulaire après la mise à jour
          this.typeExamenForm.reset();
          // Mettre à jour la liste des années avec les nouvelles données
          this.getAllTypeExamen();
        },
        (error: any) => {
          console.log(error.message);
        }
      );
    }
  }







  getAllTypeExamen() {
    return this.typeExamenService.getAllTypeExamen().subscribe(
      (value: any) => {
        this.typeExamens = value;
        console.log(this.typeExamens)
      },
      (error: any) => {
        console.log(error.message)
      }

    );
  }

  deleteTypeExamen(id: number) {
    // Logique de suppression de l'élément avec l'ID spécifié
    this.typeExamenService.deleteTypeExamen(id).subscribe(
      (value: any) => {
        console.log(value);
        this.getAllTypeExamen()
      },
      (error: any) => {
        console.log(error.message);
      }
    );
    this.confirmDeleteModal.nativeElement.modal('delete');
  }

  setActiveTypExam(typeExam : any) {
    this.activeTypeExam={...typeExam}
  }
}




