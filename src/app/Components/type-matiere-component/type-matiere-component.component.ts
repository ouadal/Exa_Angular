import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {TypeMatiereService} from "../../services/type-matiere.service";
import {ToastrService} from "ngx-toastr";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-type-matiere-component',
  templateUrl: './type-matiere-component.component.html',
  styleUrls: ['./type-matiere-component.component.css']
})
export class TypeMatiereComponentComponent implements OnInit {
  libele = new FormControl('')
  typeMats : any = []
  private confirmDeleteModal: any;
  activeTypeMat! : any
  selectedTypMatId !: number | undefined;

  typeMatForm = new FormGroup({
    libele: this.libele
  });
  constructor(private toastr:ToastrService,private typeMatService : TypeMatiereService,private authenticationService:AuthenticationService,private router:Router) { }

  ngOnInit(): void {
    this.getAllTypeMat()
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


  addTypeMat(){
    var data = {
      libele: this.libele.value,
    }
    console.log(data)
    this.typeMatService.addTypeMat(data).subscribe({
      next : (value:any) =>{
        console.log('Type matiere ajoutée avec succès !')
        this.getAllTypeMat()
        this.typeMatForm.reset()

      },
      error:(err)=>{
        console.log(err.message)

      }
    })
  }



  editTypeMat(id: number | undefined) {
    //@ts-ignore
    this.typeMatService.getTypeMatById(id).subscribe(
      (cycle: any) => {
        // Mettre à jour les contrôles du formulaire avec les données existantes
        this.selectedTypMatId = id;
        this.libele.setValue(cycle.libele);
        console.log(this.typeMatForm.value)
      },
      (error: any) => {
        console.log(error.message);
      }
    );
  }

  saveEditTypMat() {
    // Vérifier si les valeurs du formulaire sont valides
    if (this.typeMatForm.valid) {
      // Créer l'objet avec les nouvelles valeurs
      const updatedTypeMat = {
        libele: this.libele.value,

      };

      // Appeler le service pour mettre à jour l'année avec les nouvelles valeurs
      this.typeMatService.editTypeMat(this.selectedTypMatId, updatedTypeMat).subscribe(
        (value: any) => {
          console.log('Type matiere mise à jour avec succès !');
          console.log(value)
          // Réinitialiser le formulaire après la mise à jour
          this.typeMatForm.reset();
          // Mettre à jour la liste des années avec les nouvelles données
          this.getAllTypeMat();
        },
        (error: any) => {
          console.log(error.message);
        }
      );
    }
  }







  getAllTypeMat() {
    return this.typeMatService.getAllTypeMat().subscribe(
      (value: any) => {
        this.typeMats = value;
        console.log(this.typeMats)
      },
      (error: any) => {
        console.log(error.message)
      }

    );
  }

  deleteTypeMat(id: number) {
    // Logique de suppression de l'élément avec l'ID spécifié
    this.typeMatService.deleteTypeMat(id).subscribe(
      (value: any) => {
        console.log(value);
        this.getAllTypeMat()
      },
      (error: any) => {
        console.log(error.message);
      }
    );
    this.confirmDeleteModal.nativeElement.modal('delete');
  }

  setActiveTypMat(typeMat : any) {
    this.activeTypeMat={...typeMat}
  }
}


