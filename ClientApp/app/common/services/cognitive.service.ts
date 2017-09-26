import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AzureHttpClient } from "./azure.http.client";
import { BingSearchResponse } from "../models/bing.search.response";
import { ComputerVisionResponse, ComputerVisionRequest } from '../models/compute.vision.response';

@Injectable()
export class CognitiveService {
    bingSearchAPIKey = '';
    computerVisionAPIKey = '';

    constructor(private azure: AzureHttpClient) {
    }

    searchImages(searchTerm: string): Observable<BingSearchResponse> {
        return this.azure.get('https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=' + searchTerm, this.bingSearchAPIKey)
            .map(response => response.json() as BingSearchResponse)
            .catch(this.handleError);
    }

    analyzeImage(request: ComputerVisionRequest): Observable<ComputerVisionResponse> {
        return this.azure.post('https://westeurope.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures=Description,Tags', this.computerVisionAPIKey, request)
            .map(response => response.json() as ComputerVisionResponse)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}