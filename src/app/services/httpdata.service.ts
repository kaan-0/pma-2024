import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpdataService {

  constructor(private http: HttpClient) { }

getEstaciones(){
return this.http.get("https://clima.cdtechnologia.net/api/estaciones")
}

consulta(id: number) {
  return this.http.get(`https://clima.cdtechnologia.net/api/consulta/${id}`);
}



login(name: any,password: any) {
  

    const url = (`https://clima.cdtechnologia.net/api/login?name=${name}&password=${password}`);
   

  
   const headers = new HttpHeaders({
    
     'Accept': `*/*`,
     'Content-Type':'application/json'
   });
  
  
   return this.http.post(url,{headers: headers});
}

ObtenerQuery( query: string, token: any ) {
      
  const url = `https://clima.cdtechnologia.net/api/${ query }`;

  const headers = new HttpHeaders({
    Authorization: `Bearer ${ token }`
  });

  return this.http.get(url, { headers } );

}

logout(token:any) {
 return this.ObtenerQuery('/logout', token);
}
getdepto(){
  return this.http.get(`https://clima.cdtechnologia.net/api/departamento`);

}
getdeptoestacion(id: number){
  return this.http.get(`https://clima.cdtechnologia.net/api/deptoestacion/${id}`);

}
getsitio(id: number){
  return this.http.get(`https://clima.cdtechnologia.net/api/sitio/${id}`);
}

getDataEst(id: number){
  return this.http.get(`https://clima.cdtechnologia.net/api/conEst/${id}`);
}

getDataApi(lat: any,lon: any){
  var days=3;
  var lang='es';
  const apiKey='e05c540cb3c84eb3b59223422232712';
  const url = `https://api.weatherapi.com/v1/forecast.json?q=${lat},${lon}&days=${days}&lang=es`;

  let headers=new HttpHeaders({'key': apiKey});

  return this.http.get(url,{headers: headers});
}

getUReg(){
  return this.http.get("https://clima.cdtechnologia.net/api/uReg");
}

getEstacionesDepto(){
  return this.http.get("https://clima.cdtechnologia.net/api/EstCon");
}

}
