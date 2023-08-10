import { Component, OnInit } from '@angular/core';
import {AnneeService} from "../../services/annee.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-annee-component',
  templateUrl: './annee-component.component.html',
  styleUrls: ['./annee-component.component.css']
})
export class AnneeComponentComponent implements OnInit {

  dateDebutAcademique = new FormControl('')
  dateFinAcademique = new FormControl('')

  annees   :any = []
  confirmDeleteModal: any;
  activeAnnee! : any;
  selectedAnneeId!: number | undefined;

  anneeForm = new FormGroup({
    dateDebutAcademique: this.dateDebutAcademique,
    dateFinAcademique: this.dateFinAcademique
  });


  minDateValidator(minDate: string) {
    return (control: FormControl) => {
      const selectedDate = control.value;
      return selectedDate >= minDate ? null : { minDate: true };
    };
  }
  onDateDebutChange() {
    // Récupérer la valeur de la date de début
    const dateDebut = this.dateDebutAcademique.value;

    // Mettre à jour la valeur minimale de la date de fin pour empêcher de choisir une date inférieure à la date de début
    // @ts-ignore
    this.dateFinAcademique.setValidators(this.minDateValidator(dateDebut));
    this.dateFinAcademique.updateValueAndValidity();
  }





  constructor(private router:Router,private anneeService:AnneeService,private toastr: ToastrService,private authenticationService :AuthenticationService) { }

  ngOnInit(): void {

    this.getAllAnnee()
    // this.authenticationService.getMyInformations().subscribe({
    //   next:(value:any)=>{
    //     value.data[0].roles.forEach((el:any)=>{
    //       if(el.name == "ROLE_USER"){
    //         this.toastr.warning("vous n'avez pas accès a cette page..")
    //         this.router.navigateByUrl("/template/Examen")
    //       }
    //     })
    //
    //
    //   },
    //   error:(err)=>{
    //     this.toastr.error("vous ne vous etes pas encore connecté")
    //
    //     this.router.navigateByUrl("/authentication/login")
    //   }
    //
    //   }
    // )

  }
getAllAnnee(){
    this.anneeService.getAllAnnee().subscribe({
      next:(value:any) =>{
     this.annees  = value;
      console.log(this.annees)
      },
      error:(err)=>{
        console.log(err.message)

      }

    })
}

  activerAnnee(id:number) {
    this.anneeService.activerAnnee(id).subscribe({
      next:(value:any) =>{
        console.log(value)
        this.getAllAnnee()
      },
      error:(err)=>{
        console.log(err.message)
      }

    })
  }


  addAnnee(){

    var data = {
      dateDebutAcademique: this.dateDebutAcademique.value,
      dateFinAcademique: this.dateFinAcademique.value
    }

    console.log(data)
    this.anneeService.addAnnee(data).subscribe({
      next : (value:any) =>{
        this.getAllAnnee()
        this.anneeForm.reset()
        //this.toastr.success("Année ajoutée avec succès ")

      },
      error:(err)=>{
        console.log(err.message)
        this.toastr.error("y a un soucis ")

      }
    })

  }


  editAnnee(id: number | undefined) {
    // var data = {
    //   dateDebutAcademique: this.dateDebutAcademique.value,
    //   dateFinAcademique: this.dateFinAcademique.value,
    //
    // };
    // console.log(data);
    //@ts-ignore
    this.anneeService.getAnneeById(id).subscribe(
      (annee: any) => {
        // Mettre à jour les contrôles du formulaire avec les données existantes
        this.selectedAnneeId = id;
        this.dateDebutAcademique.setValue(annee.dateDebutAcademique);
        this.dateFinAcademique.setValue(annee.dateFinAcademique);
        this.getAllAnnee()
        console.log(this.anneeForm.value)



      },
      (error: any) => {
        console.log(error.message);
      }
    );
  }

  saveEditAnnee() {
    // Vérifier si les valeurs du formulaire sont valides
    if (this.anneeForm.valid) {
      // Créer l'objet avec les nouvelles valeurs
      const updatedAnnee = {
        dateDebutAcademique: this.dateDebutAcademique.value,
        dateFinAcademique: this.dateFinAcademique.value
      };

      // Appeler le service pour mettre à jour l'année avec les nouvelles valeurs
      this.anneeService.editAnnee(this.selectedAnneeId, updatedAnnee).subscribe(
        (value: any) => {
          console.log('Année mise à jour avec succès !');
          console.log(value)
          // Réinitialiser le formulaire après la mise à jour
          this.anneeForm.reset();
          // Mettre à jour la liste des années avec les nouvelles données
          this.getAllAnnee();
          this.toastr.info("modifié avec succès")
        },
        (error: any) => {
          console.log(error.message);
        }
      );
    }
  }



  deleteAnnee(id: number) {
    // Logique de suppression de l'élément avec l'ID spécifié
    this.anneeService.deleteAnnee(id).subscribe(
      (value: any) => {
        console.log(value);
      this.getAllAnnee()
        this.toastr.success("supprimé avec succès")
      },
      (error: any) => {
        console.log(error.message);
      }
    );
    this.confirmDeleteModal.nativeElement.modal('hide');
  }

setActiveAnnee(annee : any){
    this.activeAnnee={...annee}
}


}






