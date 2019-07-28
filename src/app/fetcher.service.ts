import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable({
  providedIn: 'root'
})
export class FetcherService {

  // All these keys are public, for client-side use
  apis_data = {
    youtube: {
      searchUrl: 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=${term}&key=${key}',
      apiKey: 'AIzaSyB5i0MjWgmUgpdvjpXRly7qE1BUGwfoDyQ'
    }
  }

  constructor(private http: HttpClient) { }

  getVideos(term: string, source: string): Observable<any> {
    const apiRequestUrl = this.getApiRequestUrl(term, source);
    return this.http.get<any>(apiRequestUrl);
  }

  getApiRequestUrl(term: string, source: string) {
    let url: string;

    if (source in this.apis_data) {
      const api_data = this.apis_data[source];
      url = api_data.searchUrl.replace('${term}', term).replace('${key}', api_data.apiKey);
    } else {
       url = null;
    }

    return url;
  }
}
