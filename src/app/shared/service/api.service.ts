import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = environment.api_url;
  constructor(private http : HttpClient) { }

  ExecuteGet(
    url:string,
    urlParam?:string,
    queryParam ?: HttpParams
    ): Observable<Object>{
     if(urlParam)
     {
       url = url + '/' + urlParam ;
     }
     return this.http.get( url,{params : queryParam}) ;
  }

  ExecutePost(
    url:string,
    body : any, 
    urlParam?:string,
    queryParam ?: HttpParams)
    : Observable<Object>{
    if(urlParam)
    {
      url = url + '/' + urlParam ;
    }
    return this.http.post( url,body,{params : queryParam}) ;
 }

 ExecutePut(
  url:string,
  body : any,
  urlParam?:string,
  queryParam ?: HttpParams
  ): Observable<Object>{
  if(urlParam)
  {
    url = url + '/' + urlParam ;
  }
  return this.http.put( url,body,{params : queryParam}) ;
}

ExecuteDelete(
  url:string,
  urlParam?:string,
  queryParam ?: HttpParams
  ): Observable<Object>{
  if(urlParam)
  {
    url = url + '/' + urlParam + '/' ;
  }
  return this.http.delete( url,{params : queryParam}) ;
}

ExecutePatch(
  url:string,
  body : any,
  urlParam?:string,
  queryParam ?: HttpParams
  ): Observable<Object>{
  if(urlParam)
  {
    url = url + '/' + urlParam + '/';
  }
  return this.http.patch( url,body,{params : queryParam}) ;
}


}
