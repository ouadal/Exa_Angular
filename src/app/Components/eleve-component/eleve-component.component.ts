import { Component, OnInit } from '@angular/core';
import {EleveService} from "../../services/eleve.service";
import {FormControl, FormGroup} from "@angular/forms";
import { EnrolementService } from 'src/app/services/enrolement.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import {EcoleService} from "../../services/ecole.service";

@Component({
  selector: 'app-eleve-component',
  templateUrl: './eleve-component.component.html',
  styleUrls: ['./eleve-component.component.css']
})
export class EleveComponentComponent implements OnInit {

  nom = new FormControl('')
  prenom = new FormControl('')
  date_naissance = new FormControl('')
  contactParent = new FormControl('')
  sexe: string[] = ['Masculin', 'Féminin'];
  selectedSexe = new FormControl('Masculin')
  enrollement = new FormControl('')
  eleves : any = []
  enrollements : any = []
  private confirmDeleteModal: any;
  activeElev! : any
  selectedElevId!: number | undefined;

  eleveForm = new FormGroup({
    nom: this.nom,
    prenom: this.prenom,
    date_naissance: this.date_naissance,
    contactParent: this.contactParent,
    sexe: this.selectedSexe
  });
  isAdmin: boolean = true;
  constructor(private eleveService : EleveService,private enrollementService:EnrolementService,private authenticationService:AuthenticationService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.authenticationService.getMyInformations().subscribe({
      next:(value:any)=>{
        let isAdmin = false
        console.log(value)
        for (let i = 0; i < value.data[0].roles.length; i++) {
          if(value.data[0].roles[i].name == "ROLE_ADMIN"){
            isAdmin = true;
            break
          }
        }
        if(isAdmin){
          this.getAllElevPourAdmin()
        }else {
          let idEcole =value.data[0].informations.id;
          this.getAllElev(idEcole)
          this.getAllEnrollements(idEcole)
        }
      },
      error:(err)=>{
        this.toastr.error(err.message)
      }
    })
  }


  addElev(){
    var data = {
      nom: this.nom.value,
      prenom: this.prenom.value,
      date_naissance: this.date_naissance.value,
      contactParent: this.contactParent.value,
      idEnrolement: this.enrollement.value,
      sexe:this.selectedSexe.value
    }
    console.log(data)
    this.eleveService.addElev(data).subscribe({
      next : (value:any) =>{
        console.log('eleve ajoutée avec succès !')
        this.ngOnInit()
        this.eleveForm.reset()

      },
      error:(err)=>{
        console.log(err.message)
      }
    })
  }
  editElev(id: number | undefined) {
    //@ts-ignore
    this.eleveService.getEleveById(id).subscribe(
      (eleve: any) => {
        // Mettre à jour les contrôles du formulaire avec les données existantes
        this.selectedElevId = id;
        this.nom.setValue(eleve.nom);
        this.prenom.setValue(eleve.prenom);
        this.date_naissance.setValue(eleve.date_naissance);
        this.contactParent.setValue(eleve.contactParent);
        this.selectedSexe.setValue(eleve.sexe)
        this.enrollement.setValue(eleve.enrollement);

        console.log(this.eleveForm.value)
      },
      (error: any) => {
        console.log(error.message);
      }
    );
  }

  saveEditElev() {
    // Vérifier si les valeurs du formulaire sont valides
    if (this.eleveForm.valid) {
      // Créer l'objet avec les nouvelles valeurs
      const updatedElev = {
        nom: this.nom.value,
        prenom: this.prenom.value,
        date_naissance:this.date_naissance.value,
        contactParent: this.contactParent.value,
        sexe:this.selectedSexe.value,
        idEnrollement:this.enrollement.value



      };

      // Appeler le service pour mettre à jour l'année avec les nouvelles valeurs
      this.eleveService.editElev(this.selectedElevId, updatedElev).subscribe(
        (value: any) => {
          console.log('Eleve mise à jour avec succès !');
          console.log(value)
          // Réinitialiser le formulaire après la mise à jour
          this.eleveForm.reset();
          // Mettre à jour la liste des années avec les nouvelles données
          this.ngOnInit();
        },
        (error: any) => {
          console.log(error.message);
        }
      );
    }
  }



  getAllEnrollements(idEcole:number){
    return this.enrollementService.getAllEnrolByIdEcole(idEcole).subscribe(
      (value: any) => {
        this.enrollements = value;
        console.log(this.enrollements)
      },
      (error: any) => {
        console.log(error.message)
      }

    );
  }

  getAllElevPourAdmin(){
    //getAllEcol()
    return this.eleveService.getAllElev().subscribe(
      (value: any) => {
        this.eleves = value;
        console.log(this.eleves)
      },
      (error: any) => {
        console.log(error.message)
      }

    );
  }




  getAllElev(idEcole:number) {
    return this.eleveService.getAllElevByEcol(idEcole).subscribe(
      (value: any) => {
        this.eleves = value;
        console.log(this.eleves)
      },
      (error: any) => {
        console.log(error.message)
      }

    );
  }




  deleteElev(id: number) {
    // Logique de suppression de l'élément avec l'ID spécifié
    this.eleveService.deleteElev(id).subscribe(
      (value: any) => {
        console.log(value);
        this.ngOnInit()
      },
      (error: any) => {
        console.log(error.message);
      }
    );
    this.confirmDeleteModal.nativeElement.modal('delete');
  }

  setActiveElev(eleve : any) {
    this.activeElev={...eleve}
  }
}


