import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) { }

  
getConfig() {
  debugger
  return this.http.get("https://jsonplaceholder.typicode.com/posts");
}
}
