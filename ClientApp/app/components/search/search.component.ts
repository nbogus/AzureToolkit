import { Component } from '@angular/core';
import { ImageResult } from '../../common/models/bing.search.response';
import { CognitiveService } from '../../common/services/cognitive.service';

 @Component({
     selector: 'search',
     templateUrl: './search.component.html',
     styleUrls: ['./search.component.css']
 })
 export class SearchComponent {
     constructor(private cognitiveService:CognitiveService) { 

     }

     searchResults: ImageResult[] | null;
     isSearching = false;

     search( searchTerm: string ) {
        this.searchResults = null;
        this.isSearching = true;
        console.log(searchTerm);
        this.cognitiveService.searchImages(searchTerm).subscribe((result)=>{
            this.searchResults = result.value;
            this.isSearching = false;
        });
     }
 }