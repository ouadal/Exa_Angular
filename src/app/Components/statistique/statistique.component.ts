import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
// @ts-ignore
 import {Chart,registerables} from "chart.js";
import {ExamenService} from "../../services/examen.service";
import {EcoleService} from "../../services/ecole.service";
import {MoyenneService} from "../../services/moyenne.service";
import {ToastrService} from "ngx-toastr";
import {AttributionMatiereService} from "../../services/attribution-matiere.service";
import {FormControl} from "@angular/forms";
import {SessionService} from "../../services/session.service";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css']
})
export class StatistiqueComponent implements OnInit {

  chartdata : any ;
  ecoledata:any[] = [];
  tauxdata:any[] = [];
  colordata:any[] = [];

// juste pour afficher le select de session et de examen //
  idExam!: number;
  idSession!: number;
  ecoles : any = []
  see: boolean=false;
  examens : any = []
  moyennes : any = []
  sessions : any = []
  sessionSelect = new FormControl(0)
  examenSelect = new FormControl(0)
  attributMats: any = []
  attributMatSelect = new FormControl(0)
  isAdmin = false;

  constructor( private authenticationService: AuthenticationService,private sessionService : SessionService,private attMatService : AttributionMatiereService ,private examenService:ExamenService,private ecoleService:EcoleService,private moyenneService : MoyenneService,private toastr: ToastrService , ) {
  }


  ngOnInit(): void {
    this.verifiy()
    this.listeDesEcoleAunExam()
    this.reloadData()
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
          this.getAllMoy()
        }else {
          let idEcole =value.data[0].informations.id;
          this.loadAllTestNumber1(idEcole);
        }
      },
      error:(err)=>{
        this.toastr.error(err.message)}
      })

  }

  renderChart(ecoledata:any,tauxdata:any,type:any,id:any) {
    const myChart = new Chart(id, {
      type: type,
      data: {
        labels: ecoledata,
        datasets: [{
          label: 'taux de reussite par écoles',
          data:tauxdata,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'

          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'

          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }




  verifiy(){
    this.see = true;
    //this.genererMoy();
  }

  listeDesEcoleAunExam(){
    return this.ecoleService.listeDesEcolesLorsDunExamen(this.idExam).subscribe(
      (value: any) => {
        this.ecoles = value;
      }, (error: any) => {
        console.log(error.message)
      }
    )
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
                this.getMoyForAllEcolRang()
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

  getMoyForAllEcolRang(){
    return this.moyenneService.getMoyForAllEcolRang(this.examenSelect.value!,this.sessionSelect.value!).subscribe(
      (value: any) => {
        this.moyennes = value;
        console.log(this.moyennes)
      },
      (error: any) => {
        console.log(error.message)
      }

    );
  }



  getAllMoy() {
    return this.moyenneService.getAllMoy().subscribe(
      (value: any) => {
        this.moyennes = value;
        console.log(this.moyennes)
      },
      (error: any) => {
        console.log(error.message)
      }

    );
  }




  reloadData() {
    this.examenService.getStatisques(this.idExam,this.idSession).subscribe(

      res =>{ this.chartdata = res;
        if(this.chartdata!=null){
          for(let i=0;i<this.chartdata.length; i++){
            console.log(this.chartdata[i]);
            this.ecoledata.push(this.chartdata[i].ecole.nomEcole)
            this.tauxdata.push(this.chartdata[i].taux)
          }
          this.renderChart(this.ecoledata,this.tauxdata,'bar','vc');
          this.renderChart(this.ecoledata,this.tauxdata,'pie','CV');
        }

      }
      // next:(value:any)=>{let hashMapData: any[] = [];
      // value.data.forEach(response:any)=>{
      //   this.labels.push(response.ecoles)
      //     data.push(response.datasets.data)
      //   }


    )
  }
}
