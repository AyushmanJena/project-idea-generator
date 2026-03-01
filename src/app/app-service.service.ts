import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RequestModel, ResponseModel} from './RequestModel';
import {catchError, map, throwError} from 'rxjs';
import {environment} from '../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  private httpClient = inject(HttpClient);

  responseModel: ResponseModel = {
    platforms: [],
    userBases: [],
  };

  generatedIdeaStr : string = "";
  private apiUrl = environment.apiUrl;

  getLists(){
    // console.log("/get-factors-list call made");
    // return this.httpClient.get<ResponseModel>('http://localhost:8080/get-factors-list').pipe(
    return this.httpClient.get<ResponseModel>(`${this.apiUrl}/get-factors-list`).pipe(
      map((resData) => {
        this.responseModel = resData; // Save for internal use
        // console.log(this.responseModel);
        return this.responseModel;
      }),
      catchError((error) => {
        console.error('Error fetching lists:', error);
        return throwError(() => new Error(error.message || 'Something went wrong'));
      })
    );
  }

  getOverview(requestModel: RequestModel) {
    return this.httpClient.post(`${this.apiUrl}/generate-idea`,
      requestModel,
      { responseType: 'text' }  // tells angular not to expect json but plain text
    ).pipe(
      map((resData) => {
        this.generatedIdeaStr = resData;
        // console.log(this.generatedIdeaStr);
        return this.generatedIdeaStr;
      }),
      catchError((error) => {
        console.error('Error fetching project overview:', error);
        return throwError(() => new Error(error.message || 'Something went wrong'));
      })
    );
  }

  constructor() { }


}

