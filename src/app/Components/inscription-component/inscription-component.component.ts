import { Component, OnInit } from '@angular/core';
import {InscriptionService} from "../../services/inscription.service";
import {FormControl, FormGroup} from "@angular/forms";
import {EnrolementService} from "../../services/enrolement.service";
import {EleveService} from "../../services/eleve.service";
import { ExamenService } from 'src/app/services/examen.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-inscription-component',
  templateUrl: './inscription-component.component.html',
  styleUrls: ['./inscription-component.component.css']
})
export class InscriptionComponentComponent implements OnInit {
  statut = new FormControl('')
  enrolement = new FormControl('')
  annee = new FormControl('')
  eleve = new FormControl('')
  ecole = new FormControl('')
  examenSelect = new FormControl(0)


  inscriptions : any = []
  enrolements: any = []
  private confirmDeleteModal: any;
  activeInsc! : any
  selectedInscId!: number | undefined;

  inscriptionForm = new FormGroup({
    nom:this.statut,
    prenom:this.enrolement,
    annee: this.annee,
    eleve: this.eleve,
    ecole: this.ecole,
  });

  constructor(private inscriptionService : InscriptionService,private enrolementService:EnrolementService,private toastr:ToastrService,private authenticationService:AuthenticationService) { }

  ngOnInit(): void {
    this.authenticationService.getMyInformations().subscribe({
      next:(value:any)=>{
        let idEcole =value.data[0].informations.id;
        console.log(idEcole)
        this.getListExamenByEcol(idEcole)
        //console.log('this.examenSelect.value! :'+this.examenSelect.value!)
        this.examenSelect = new FormControl(null)



      },
      error:(err)=>{
        this.toastr.error(err.message)
      }
    })



  }




  addInsc(){
    var data = {
      nom: "ouadal",
      prenom: "oual",
      date_naissance: 2021,
      contactParent: 97488732,
      idEnrolement:2
    }
    console.log(data)
    this.inscriptionService.addInsc(data).subscribe({
      next : (value:any) =>{
        console.log('Inscription ajoutée avec succès !')
        this.getAllInsc()
        this.inscriptionForm.reset()

      },
      error:(err)=>{
        console.log(err.message)

      }
    })
  }
  editInsc(id: number | undefined) {
    //@ts-ignore
    this.inscriptionService.getInscById(id).subscribe(
      (inscription: any) => {
        // Mettre à jour les contrôles du formulaire avec les données existantes
        this.selectedInscId = id;
        this.statut.setValue(inscription.statut);
        this.enrolement.setValue(inscription.enrolement);
        this.annee.setValue(inscription.annee);
        this.ecole.setValue(inscription.ecole);
        this.eleve.setValue(inscription.eleve);
        console.log(this.inscriptionForm.value)
      },
      (error: any) => {
        console.log(error.message);
      }
    );
  }

  saveEditInsc() {
    // Vérifier si les valeurs du formulaire sont valides
    if (this.inscriptionForm.valid) {
      // Créer l'objet avec les nouvelles valeurs
      const updatedInsc = {
        statut:this.statut.value,
        enrolement:this.enrolement.value,
        annee:this.annee.value,
        eleve:this.eleve.value,
        ecole:this.ecole.value,

      };

      // Appeler le service pour mettre à jour l'année avec les nouvelles valeurs
      this.inscriptionService.editInsc(this.selectedInscId, updatedInsc).subscribe(
        (value: any) => {
          console.log('Inscription mise à jour avec succès !');
          console.log(value)
          // Réinitialiser le formulaire après la mise à jour
          this.inscriptionForm.reset();
          // Mettre à jour la liste des années avec les nouvelles données
          this.getAllInsc();
        },
        (error: any) => {
          console.log(error.message);
        }
      );
    }
  }



  effacerSelection() {
    // @ts-ignore
    this.examenSelect.setValue(''); // Réinitialisez la valeur du FormControl à une chaîne vide
  }



  getAllInsc() {
    return this.inscriptionService.getAllInsc().subscribe(
      (value: any) => {
        this.inscriptions = value;
        console.log(this.inscriptions)
      },
      (error: any) => {
        console.log(error.message)
      }

    );
  }

  getAllInscPerExamenAndEcole(idEcole:number,idExamen:number) {
    console.log(idEcole)
    console.log(idExamen)
    return this.inscriptionService.listInscPerEcolAndExam(idEcole,idExamen).subscribe(
      (value: any) => {
        this.inscriptions = value;
        console.log(this.inscriptions)
      },
      (error: any) => {
        console.log(error.message)
      }

    );
  }

  getListExamenByEcol(id:number){
    return this.enrolementService.getAllEnrolByIdEcole(id).subscribe(
      (value: any) => {
        this.enrolements = value;
        //console.log('enrolement :')
        //console.log(this.enrolements)
        this.examenSelect.patchValue(this.enrolements[0].examen.id)
        this.getAllInscPerExamenAndEcole(id,this.examenSelect.value!)
        //console.log('this.examenSelect.value! :'+this.examenSelect.value!)
        //console.log('list exam idecole' + id)
        this.loadInscription()
      },
      (error: any) => {
        console.log(error.message)
      }

    );
  }

  deleteInsc(id: number) {
    // Logique de suppression de l'élément avec l'ID spécifié
    this.inscriptionService.deleteInsc(id).subscribe(
      (value: any) => {
        console.log(value);
        this.getAllInsc()
      },
      (error: any) => {
        console.log(error.message);
      }
    );
    this.confirmDeleteModal.nativeElement.modal('delete');
  }

  setActiveInsc(inscription : any) {
    this.activeInsc={...inscription}
  }

  loadInscription(){
    //parseInt(this.examenSelect.value!)
    this.authenticationService.getMyInformations().subscribe({
      next:(value:any)=>{
        let idEcole =value.data[0].informations.id;
        this.inscriptionService.listInscPerEcolAndExam(idEcole,this.examenSelect.value!).subscribe(
          (value: any) => {
            this.inscriptions = value;
            console.log(this.inscriptions)
          },
          (error: any) => {
            console.log(error.message)
          })
      },
      error:(err)=>{
        this.toastr.error(err.message)
      }
    })
  }
}

