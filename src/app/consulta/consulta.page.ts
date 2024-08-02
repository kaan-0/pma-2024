import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpdataService } from '../services/httpdata.service';
import { compileNgModule } from '@angular/compiler';
import { LoadingController,InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.page.html',
  styleUrls: ['./consulta.page.scss'],
})
export class ConsultaPage implements OnInit {

  estaciones_array: any[]=[];
    estaciones_names: any[]=[];
    estaciones_ub: any[]=[];

    est_dep: any[]=[];

    departamentos: any[]=[];

    lapaz: any[]=[];
    fmor: any[]=[];
    chol: any[]=[];
    ep: any[]=[];

   

  estaciones=[{
    id:0,
    nombre:'',
    ubicacion:'',
    depto:''
  }]

  deptos=[{
    id:0,
    nombre:'',
    ubicacion:'',
    depto:''
  }]

  isLoading = false;

  constructor(private router: Router,
      private http: HttpdataService,
      private loadingctrl: LoadingController,
     ) { }//end constructor

  ngOnInit() {
    this.present();
    console.log("onIninit consulta");
    this.getConsultaInfo();
    this.getDepto();
    this.getEstacionesDepto();
  }

  irADash(){
    this.router.navigate(["/dashboard"]);
  }

  getConsultaInfo(){
    console.log("en funcion getConsultaInfo."),
    this.http.getEstacionesDepto().subscribe(
      (data) => {
        data = JSON.stringify(data);
        this.estaciones = JSON.parse(data.toString());
         
         
         console.log(this.estaciones); 
        
        this.dismiss();
    });
    
    
  }

  getDepto(){
    console.log("getDepto");
    this.http.getdepto().subscribe(
      data=>{
        data = JSON.stringify(data);
        this.departamentos=JSON.parse(data.toString());
        // console.log(this.departamentos);
        
      }
    );
    
  }

  getEstacionesDepto(){
    console.log("estacionesDepto");
    this.http.getEstacionesDepto().subscribe(data=>{
      
      data = JSON.stringify(data);
        this.deptos = JSON.parse(data.toString());
        // console.log("-----------");        
        // console.log(this.deptos[0].nombre);
        // console.log("-----------");
        
    })
    
  }

  async present() {
    this.isLoading = true;
    return await this.loadingctrl.create({
        message: 'Cargando estaciones...',
        spinner: "bubbles"
      // duration: 5000,
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

   async dismiss() {
    this.isLoading = false;
    return await this.loadingctrl.dismiss().then(() => console.log('dismissed'));
  }

  estacionId(id: number){
    console.log(id);
    this.router.navigate(['/consulta-datos',id]);
    
  }

}
