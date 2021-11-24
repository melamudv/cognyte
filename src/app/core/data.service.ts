import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IData} from '../models/data.model';





@Injectable()
export class DataService {

  baseUrl: string = './assets/data';

  constructor(private http: HttpClient) { }

  getData(){
    return this.http.get<IData[]>(`${this.baseUrl}/sampleDataset.json`);
  }

}
