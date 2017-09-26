import { Component } from '@angular/core';
import { ImageResult } from '../../common/models/bing.search.response';
import { CognitiveService } from '../../common/services/cognitive.service';
import { ComputerVisionRequest, ComputerVisionResponse } from '../../common/models/compute.vision.response';

@Component({
    selector: 'search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent {
    currentAnalytics: ComputerVisionResponse | null;
    currentItem: ImageResult | null;
    isAnalyzing = false;
    searchResults: ImageResult[] | null;
    isSearching = false;

    constructor(private cognitiveService: CognitiveService) {

    }

    search(searchTerm: string) {
        this.searchResults = null;
        this.isSearching = true;
        this.currentAnalytics = null;
        this.cognitiveService.searchImages(searchTerm).subscribe((result) => {
            this.searchResults = result.value;
            this.isSearching = false;
        });
    }

    analyze(result: ImageResult) {
        this.currentItem = result;
        this.currentAnalytics = null;
        this.isAnalyzing = true;
        this.cognitiveService.analyzeImage({ url: result.thumbnailUrl } as ComputerVisionRequest).subscribe(result => {
            this.currentAnalytics = result;
            this.isAnalyzing = false;
        });
        window.scroll(0, 0);
    }
}