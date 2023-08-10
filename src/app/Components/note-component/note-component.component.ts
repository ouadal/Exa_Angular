import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NoteService} from "../../services/note.service";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {ExamenService} from "../../services/examen.service";
import {AttributionMatiereService} from "../../services/attribution-matiere.service";
import {MatiereService} from "../../services/matiere.service";
import {ToastrService} from "ngx-toastr";
import {EnrolementService} from "../../services/enrolement.service";
import {SessionService} from "../../services/session.service";
import {InscriptionService} from "../../services/inscription.service";

@Component({
  selector: 'app-note-component',
  templateUrl: './note-component.component.html',
  styleUrls: ['./note-component.component.css']
})
export class NoteComponentComponent implements OnInit {
   maNOte : NoteInterface = {
     id : 0,
     noteExam : 0
   }
  statut = new FormControl('')
  noteExam = new FormControl('')
  inscription = new FormControl('')
  attributionMatiere = new FormControl('')
  session = new FormControl('')
  examen = new FormControl('')
  notes : any = []
  private confirmDeleteModal: any;
  activeNote! : any
  selectedNotId!: number | undefined;

  modifActif : boolean = false

  enrolements: any = []
  examens: any = []
  sessions: any = []
  sessionSelect = new FormControl(0)
  examenSelect = new FormControl(0)
  matSelect=new FormControl(0)
  attributMatSelect= new FormControl(0)
  inscSelect= new FormControl(0)
  isAdmin = false
  matieres  :any  = []
  attributMats: any = []
  inscriptions : any = []

  noteFormArray! : FormGroup
  noteForm = this.fb.group({
    statut: this.statut,
    noteExam: this.noteExam,
    inscription: this.inscription,
    attributionMatiere: this.attributionMatiere,
    session: this.session,
    examen: this.examen


  });
  constructor(private fb : FormBuilder,private inscriptionService : InscriptionService,private sessionService:SessionService,private enrolementService: EnrolementService,private toastr:ToastrService,private matiereService:MatiereService,private attMatService: AttributionMatiereService,private noteService : NoteService,private authenticationService:AuthenticationService,private examenService : ExamenService) {

  }

  get notesFormArray() : FormArray{
    return this.noteFormArray.get('notes') as FormArray
  }
  ngOnInit(): void {
    //this.getAllSession()
    //this.getAllAttMat()
    this.noteFormArray = this.fb.group({
      'notes' : new FormArray([])
    })

    this.authenticationService.getMyInformations().subscribe({
      next:(value:any)=>{
        let isAdmin = false
        console.log(value)
        for (let i = 0; i < value.data[0].roles.length; i++) {
          if(value.data[0].roles[i].name == "ROLE_ADMIN"){
            isAdmin = true;
            this.isAdmin = true;
            break
          }
        }
        if(isAdmin){
          //this.getAllExamPourAdmin()
          this.getAllExam()
        }else {
          let idEcole =value.data[0].informations.id;
          //this.getListExamPerEcol(idEcole)
          this.loadAllTestNumber1(idEcole);
          //this.getAttMatByEcolConn(idEcole)
          //let examenSelect =value.data[0].informations.id;
          //let sessionSelect =value.data[0].informations.id;
          //let attributMatSelect =value.data[0].informations.id;
          //this.findNotePerExamAttribSess(examenSelect,sessionSelect,attributMatSelect)
        }
      },
      error:(err)=>{
        this.toastr.error(err.message)
      }
    })



  }

  activeModif(){
    this.modifActif=true
  }


  reloadDataMat(){
    this.authenticationService.getMyInformations().subscribe({
      next:(value:any)=>{

        let isAdmin = false
        console.log(value)
        for (let i = 0; i < value.data[0].roles.length; i++) {
          if(value.data[0].roles[i].name == "ROLE_ADMIN"){
            isAdmin = true;
            this.isAdmin = true;
            break
          }
        }
        if(isAdmin){
          //this.getAllExamPourAdmin()
          this.getAllExam()
        }else {
          let idEcole =value.data[0].informations.id;
          this.listNotePerExamSesionMat(this.examenSelect.value!,this.sessionSelect.value!,this.attributMatSelect.value!)
        }
      },
      error:(err)=>{
        this.toastr.error(err.message)
      }
    })
  }


  reloadData(){
    this.authenticationService.getMyInformations().subscribe({
      next:(value:any)=>{

        let isAdmin = false
        console.log(value)
        for (let i = 0; i < value.data[0].roles.length; i++) {
          if(value.data[0].roles[i].name == "ROLE_ADMIN"){
            isAdmin = true;
            this.isAdmin = true;
            break
          }
        }
        if(isAdmin){
          //this.getAllExamPourAdmin()
          this.getAllExam()
        }else {
          let idEcole =value.data[0].informations.id;
          this.attMatService.getAttMatByEcolConnAndExamen(idEcole,this.examenSelect.value!).subscribe(
            (value1: any) => {
              this.attributMats = value1;
              if(value1[0]){
                this.attributMatSelect.patchValue(value1[0].id)
              }else {
                this.attributMatSelect.patchValue(0)
              }
              console.log("RELOAD DATA")
              console.log(this.examenSelect.value)
              console.log(this.sessionSelect.value)
              console.log(this.attributMatSelect.value)
              this.listNotePerExamSesionMat(this.examenSelect.value!,this.sessionSelect.value!,this.attributMatSelect.value!)
              console.log(this.attributMats)
            },
            (err)=>{

            }
            )
          /*this.examenService.listExamPerEcol(idEcole).subscribe(
            (value: any) => {
              this.examens = value;
              this.attMatService.getAttMatByEcolConnAndExamen(idEcole,this.examenSelect.value!).subscribe(
                (value1: any) => {
                  this.attributMats = value1;
                  console.log(this.attributMats)
                  this.sessionService.getAllSession().subscribe(
                    (value2: any) => {
                      this.sessions = value2;
                      //this.getAllEcolThatAreEnrolled();
                      this.listNotePerExamSesionMat(this.examenSelect.value!,this.sessionSelect.value!,this.attributMatSelect.value!)
                      console.log(this.sessions)
                    },
                    (error: any) => {
                      console.log(error.message)
                    }
                  );
                },
                (error: any) => {
                  console.log(error.message)
                }

              );
              //this.getAllEcolThatAreEnrolled();
              console.log(this.examens)
            },
            (error: any) => {
              console.log(error.message)
            }
          );*/
        }
      },
      error:(err)=>{
        this.toastr.error(err.message)
      }
    })
  }

  loadAllTestNumber1(idEcole:number){
    return this.examenService.listExamPerEcol(idEcole).subscribe(
      (value: any) => {
        this.examens = value;
        this.examenSelect.patchValue(value[0].id)
        this.attMatService.getAttMatByEcolConnAndExamen(idEcole,this.examenSelect.value!).subscribe(
          (value1: any) => {
            this.attributMats = value1;
            this.attributMatSelect.patchValue(value1[0].id)
            console.log(this.attributMats)
            this.sessionService.getAllSession().subscribe(
              (value2: any) => {
                this.sessions = value2;
                this.sessionSelect.patchValue(value2[0].id)
                //this.getAllEcolThatAreEnrolled();
                this.listNotePerExamSesionMat(this.examenSelect.value!,this.sessionSelect.value!,this.attributMatSelect.value!)
                console.log(this.sessions)
              },
              (error: any) => {
                console.log(error.message)
              }
            );
          },
          (error: any) => {
            console.log(error.message)
          }

        );
        //this.getAllEcolThatAreEnrolled();
        console.log(this.examens)
      },
      (error: any) => {
        console.log(error.message)
      }
    );
  }



  getAllSession(){
    this.sessionService.getAllSession().subscribe(
      (value: any) => {
        this.sessions = value;
        this.sessionSelect.patchValue(value[0].id)
        this.getAllEcolThatAreEnrolled();
        console.log(this.sessions)
      },
      (error: any) => {
        console.log(error.message)
      }
    );

  }

  getAllAttMat(){
    this.attMatService.getAllAttMat().subscribe(
      (value: any) => {
        this.attributMats = value;
        this.attributMatSelect.patchValue(value[0].id)
        this.getAllEcolThatAreEnrolled();
        console.log(this.attributMats)
      },
      (error: any) => {
        console.log(error.message)
      }
    );
  }




  loadExamen(){
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
          //this.getAllExamPourAdmin()
          this.getAllEcolThatAreEnrolled()
        }else {
          // let idEcole =value.data[0].informations.id;
          this.getAllEcolThatAreEnrolled()
        }
      },
      error:(err)=>{
        this.toastr.error(err.message)
      }
    })
  }



  loadInsc(){
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
          //this.getAllExamPourAdmin()
          this.getAllNot()
        }else {
          // let idElev =value.data[0].informations.id;
          // let idExamen =value.data[0].informations.id;
          // this.listInscDesElevPerExam(idElev,idExamen)
          let examenSelect =value.data[0].informations.id;
          let sessionSelect =value.data[0].informations.id;
          let attributMatSelect =value.data[0].informations.id;
          this.listNotePerExamSesionMat(examenSelect,sessionSelect,attributMatSelect)
        }
      },
      error:(err)=>{
        this.toastr.error(err.message)
      }
    })
  }



  listInscDesElevPerExam(idElev:number,idExamen:number){
    return this.inscriptionService.listInscPerEcolAndExam(idElev,idExamen).subscribe(
      (value: any) => {
        this.inscriptions = value;
        this.inscSelect.patchValue(value[0].id)
        console.log(this.inscriptions)
        this.ngOnInit()
      },
      (error: any) => {
        console.log(error.message)
      }

    );
  }





  getAllExam(){
    this.examenService.getAllExam().subscribe(
      (value: any) => {
        this.examens = value;
        this.examenSelect.patchValue(value[0].id)
        this.getAllEcolThatAreEnrolled();
        console.log(this.examens)
      },
      (error: any) => {
        console.log(error.message)
      }
    );
  }


  getListExamPerEcol(idEcole:number){
    return this.examenService.listExamPerEcol(idEcole).subscribe(
      (value: any) => {
        this.examens = value;
        this.examenSelect.patchValue(value[0].id)
        this.getAllEcolThatAreEnrolled();
        console.log(this.examens)
      },
      (error: any) => {
        console.log(error.message)
      }
    );
  }



  getAttMatByEcolConnAndExam(idEcole:number,idExamen:number){
    return this.attMatService.getAttMatByEcolConnAndExamen(idEcole,idExamen).subscribe(
      (value: any) => {
        this.attributMats = value;
        console.log(this.attributMats)
      },
      (error: any) => {
        console.log(error.message)
      }

    );
  }




  getAllEcolThatAreEnrolled() {
    return this.enrolementService.getAllEcolThatAreEnrolled(this.examenSelect.value!).subscribe(
      (value: any) => {
        this.enrolements = value;
        console.log(this.enrolements)
      },
      (error: any) => {
        console.log(error.message)
      }
    );
  }




















  addNote(){
    var data = {

      statut: this.statut.value,
      noteExam: this.noteExam.value,
      inscription: this.inscription.value,
      attributionMatiere: this.attributionMatiere.value,
      session: this.session.value,
      examen: this.examen.value,
    }
    console.log(data)
    this.noteService.addNot(data).subscribe({
      next : (value:any) =>{
        console.log('Note ajoutée avec succès !')
        this.getAllNot()
        this.noteForm.reset()

      },
      error:(err)=>{
        console.log(err.message)

      }
    })
  }
  editNot(id: number | undefined) {
    //@ts-ignore
    this.noteService.getNotById(id).subscribe(
      (note: any) => {
        // Mettre à jour les contrôles du formulaire avec les données existantes
        this.selectedNotId = id;
        this.statut.setValue(note.statut);
        this.noteExam.setValue(note.noteExam);
        this.inscription.setValue(note.inscription);
        this.attributionMatiere.setValue(note.attributionMatiere);
        this.session.setValue(note.session);
        this.examen.setValue(note.examen);
        console.log(this.noteForm.value)
      },
      (error: any) => {
        console.log(error.message);
      }
    );
  }

  saveEditNot() {
    // Vérifier si les valeurs du formulaire sont valides
    if (this.noteForm.valid) {
      // Créer l'objet avec les nouvelles valeurs
      const updatedNot = {
        statut: this.statut.value,
        noteExam: this.noteExam.value,
        inscription: this.attributionMatiere.value,
        attributionMatiere: this.attributionMatiere.value,
        session: this.session.value,
        examen: this.examen.value

      };

      // Appeler le service pour mettre à jour l'année avec les nouvelles valeurs
      this.noteService.editNot(this.selectedNotId, updatedNot).subscribe(
        (value: any) => {
          console.log('Cycle mise à jour avec succès !');
          console.log(value)
          // Réinitialiser le formulaire après la mise à jour
          this.noteForm.reset();
          // Mettre à jour la liste des années avec les nouvelles données
          this.getAllNot();
        },
        (error: any) => {
          console.log(error.message);
        }
      );
    }
  }






  listNotePerExamSesionMat(examenSelect:number,sessionSelect:number,attributMatSelect:number){
    this.noteService.listNotePerExamSesionMat(this.examenSelect.value, this.sessionSelect.value,this.attributMatSelect.value).subscribe(
      (value: any) => {
        this.notes = value;
        console.log(this.notes)

        // FOR FORMARRAY

        this.notesFormArray.reset()

        this.noteFormArray = this.fb.group({
          'notes' : new FormArray([])
        })

        for(let i = 0; i<value.length; i++){
          this.notesFormArray.push(this.fb.group({
            id : this.fb.control(this.notes[i].id),
            note : this.fb.control(this.notes[i].noteExam, Validators.required)
          }))
        }


      },
      (error: any) => {
        console.log(error.message)
      }

    );
  }



  validerModif() {
    this.modifActif=false
    for (let fgroup of this.notesFormArray.controls) {
      if (fgroup instanceof FormGroup) {
        if (fgroup.get('note')?.value.toString().includes(".")) {
          if (fgroup.get('note')?.value > 20 || fgroup.get('note')?.value < 0 ||

            (
              fgroup.get('note')?.value.toString().split(".")[1] != 25 &&
              fgroup.get('note')?.value.toString().split(".")[1] != 5 &&
              fgroup.get('note')?.value.toString().split(".")[1] != 75
            )) {
            console.log(fgroup.get('note')?.value.toString().split(".")[1])
            console.log("note non save")
            this.toastr.error("Une note non comprise dans l'intervalle définie réperée", "Non prise en compte")
            this.listNotePerExamSesionMat(this.examenSelect.value!, this.sessionSelect.value!, this.attributMatSelect.value!)

          } else {
            this.maNOte.id = fgroup.get('id')?.value
            this.maNOte.noteExam = fgroup.get('note')?.value
            this.noteService.editNot(this.maNOte.id, this.maNOte).subscribe({
              next: (data) => {
                console.log("saved")
                this.toastr.success("Note mise à jour", "Succès")
                this.listNotePerExamSesionMat(this.examenSelect.value!, this.sessionSelect.value!, this.attributMatSelect.value!)

                //this.wantModif=false
                //this.notesFormArray.clear()
              }, error: (err) => {

                alert("error" + err)

                //this.notesFormArray.clear()

              }
            })
          }
        } else {
          if (fgroup.get('note')?.value > 20 || fgroup.get('note')?.value < 0) {
            console.log(fgroup.get('note')?.value.toString().split(".")[1])
            console.log("note non save")
            this.toastr.error("Une note non comprise dans l'intervalle définie réperée", "Non prise en compte")
            this.listNotePerExamSesionMat(this.examenSelect.value!, this.sessionSelect.value!, this.attributMatSelect.value!)

          } else {
            this.maNOte.id = fgroup.get('id')?.value
            this.maNOte.noteExam = fgroup.get('note')?.value
            this.noteService.editNot(this.maNOte.id, this.maNOte).subscribe({
              next: (data) => {
                console.log("saved")
                this.toastr.success("Note mise à jour", "Succès")
                this.listNotePerExamSesionMat(this.examenSelect.value!, this.sessionSelect.value!, this.attributMatSelect.value!)


                //this.wantModif=false
                //this.notesFormArray.clear()
              }, error: (err) => {

                alert("error" + err)

                //this.notesFormArray.clear()

              }
            })
          }
        }
      }

    }

  }
  genererNote(){
        if(this.sessionSelect.value){
          return this.noteService.genereNotePerExam(this.examenSelect.value, this.sessionSelect.value).subscribe(
            (value: any) => {
              this.notes = value;
              console.log(this.notes)
            },
            (error: any) => {
              console.log(error.message)
            }

          );

        }else {
          return false;
        }

    }



  listNotePerExamSess(idExamen: number | null, idSession: number | null){
    return this.noteService.listNotePerExamSess(idExamen,idSession).subscribe(
      (value: any) => {
        this.notes = value;
        console.log(this.notes)
      },
      (error: any) => {
        console.log(error.message)
      }

    );
  }


  getAllNot() {
    return this.noteService.getAllNot().subscribe(
      (value: any) => {
        this.notes = value;
        console.log(this.notes)


        // FOR FORMARRAY

        this.notesFormArray.reset()

        this.noteFormArray = this.fb.group({
          'notes' : new FormArray([])
        })

        for(let i = 0; i<value.length; i++){
          this.notesFormArray.push(this.fb.group({
            id : this.fb.control(this.notes[i].id),
            note : this.fb.control(this.notes[i].noteExam, Validators.required)
          }))
        }



      },
      (error: any) => {
        console.log(error.message)
      }

    );
  }

  deleteNot(id: number) {
    // Logique de suppression de l'élément avec l'ID spécifié
    this.noteService.deleteNot(id).subscribe(
      (value: any) => {
        console.log(value);
        this.getAllNot()
      },
      (error: any) => {
        console.log(error.message);
      }
    );
    this.confirmDeleteModal.nativeElement.modal('delete');
  }

  setActiveNot(note : any) {
    this.activeNote={...note}
  }


}


interface NoteInterface  {
  id : number,
    noteExam : number
}
