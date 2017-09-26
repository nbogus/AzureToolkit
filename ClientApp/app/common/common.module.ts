import { NgModule } from '@angular/core';
import { AzureHttpClient } from "./services/azure.http.client";
import { CognitiveService } from "./services/cognitive.service";

@NgModule({
    providers: [AzureHttpClient, CognitiveService]
})
export class CommonModule { 
    
}