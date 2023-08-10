import { Component, OnInit } from '@angular/core';
import {EcoleService} from "../../services/ecole.service";
import {FormControl, FormGroup} from "@angular/forms";
import {CycleTypeExamenService} from "../../services/cycle-type-examen.service";
import {AuthenticationService} from "../../services/authentication.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-ecole-component',
  templateUrl: './ecole-component.component.html',
  styleUrls: ['./ecole-component.component.css']
})
export class EcoleComponentComponent implements OnInit {
  nomEcole = new FormControl('')
  adresse = new FormControl('')
  telephone = new FormControl('')
  email = new FormControl('')
  ficheStatut = new FormControl('')
  Statut = new FormControl('')
  Matricule = new FormControl('')
  cycle = new FormControl('')
  ecoles : any = []
  private confirmDeleteModal: any;
  activeEcole! : any
  selectedEcoleId!: number | undefined;

  ecoleForm = new FormGroup({
    nomEcole: this.nomEcole,
    adresse: this.adresse,
    telephone: this.telephone,
    email: this.email,
    ficheStatut: this.ficheStatut,
    Statut: this.Statut,
    Matricule: this.Matricule,
    cycle: this.cycle

  });


  constructor(private toastr : ToastrService, private ecoleService : EcoleService,private authenticationService : AuthenticationService) { }

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
          this.getAllEcol()
        }else {
          let idEcole =value.data[0].informations.id;
          this.getAllExamPourEcol(idEcole)





        }
      },
      error:(err)=>{
        this.toastr.error(err.message)
      }
    })

  }

  addEcol(){
    var data = {
      nomEcole: this.nomEcole.value,
      adresse: this.adresse.value,
      telephone: this.telephone.value,
      email: this.email.value,
      ficheStatut: this.ficheStatut.value,
      Statut: this.Statut.value,
      Matricule: this.Matricule.value,
      cycle: this.cycle.value,
    }
    console.log(data)
    this.ecoleService.addEcol(data).subscribe({
      next : (value:any) =>{
        console.log('Cycle ajoutée avec succès !')
        this.getAllEcol()
        this.ecoleForm.reset()

      },
      error:(err)=>{
        console.log(err.message)

      }
    })
  }
  editEcol(id: number | undefined) {
    //@ts-ignore
    this.ecoleService.getEcolById(id).subscribe(
      (ecole: any) => {
        // Mettre à jour les contrôles du formulaire avec les données existantes
        this.selectedEcoleId = id;
        this.nomEcole.setValue(ecole.nomEcole);
        this.adresse.setValue(ecole.adresse);
        this.telephone.setValue(ecole.telephone);
        this.email.setValue(ecole.email);
        this.ficheStatut.setValue(ecole.ficheStatut);
        this.Statut.setValue(ecole.Statut);
        this.Matricule.setValue(ecole.Matricule);
        this.cycle.setValue(ecole.cycle);
        console.log(this.ecoleForm.value)
      },
      (error: any) => {
        console.log(error.message);
      }
    );
  }

  saveEditEcol() {
    // Vérifier si les valeurs du formulaire sont valides
    if (this.ecoleForm.valid) {
      // Créer l'objet avec les nouvelles valeurs
      const updatedEcol = {
        nomEcole: this.nomEcole.value,
        adresse: this.adresse.value,
        telephone: this.telephone.value,
        email: this.email.value,
        ficheStatut: this.ficheStatut.value,
        Statut: this.Statut.value,
        Matricule: this.Matricule.value,
        cycle: this.cycle.value,

      };

      // Appeler le service pour mettre à jour l'année avec les nouvelles valeurs
      this.ecoleService.editEcol(this.selectedEcoleId, updatedEcol).subscribe(
        (value: any) => {
          console.log('Ecole mise à jour avec succès !');
          console.log(value)
          // Réinitialiser le formulaire après la mise à jour
          this.ecoleForm.reset();
          // Mettre à jour la liste des années avec les nouvelles données
          this.getAllEcol();
        },
        (error: any) => {
          console.log(error.message);
        }
      );
    }
  }

  getAllExamPourEcol(id: number ){
    //getAllEcol()
    return this.ecoleService.listeDesEcolesLorsDunExamen(id).subscribe(
      (value: any) => {
        this.ecoles = value;
        console.log(this.ecoles)
      },
      (error: any) => {
        console.log(error.message)
      }

    );
  }





  getAllEcol() {
    return this.ecoleService.getAllEcol().subscribe(
      (value: any) => {
        this.ecoles = value;
        console.log(this.ecoles)
      },
      (error: any) => {
        console.log(error.message)
      }

    );
  }

  deleteEcol(id: number) {
    // Logique de suppression de l'élément avec l'ID spécifié
    this.ecoleService.deleteEcol(id).subscribe(
      (value: any) => {
        console.log(value);
        this.getAllEcol()
      },
      (error: any) => {
        console.log(error.message);
      }
    );
    this.confirmDeleteModal.nativeElement.modal('delete');
  }

  setActiveEcol(ecole : any) {
    this.activeEcole={...ecole}
  }

  protected readonly CycleTypeExamenService = CycleTypeExamenService;
}
