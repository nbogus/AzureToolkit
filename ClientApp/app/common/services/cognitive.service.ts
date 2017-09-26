import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AzureHttpClient } from "./azure.http.client";
import { BingSearchResponse } from "../models/bing.search.response";

@Injectable()
export class CognitiveService {
    bingSearchAPIKey = 'apiKey';
    constructor(private azure: AzureHttpClient) {

    }
    
    searchImages(searchTerm: string): Observable<BingSearchResponse> {
        return this.azure.get('https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=' + searchTerm, this.bingSearchAPIKey)
            .map(response => response.json() as BingSearchResponse)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}