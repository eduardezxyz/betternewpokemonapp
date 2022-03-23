import { Injectable } from '@angular/core';
import { PokeTrainer } from 'src/models/data';
import { DataStore, OdataConfiguration } from './data-store';
import { OdataContext } from './odata-context';

/**
 * <Summary>
 * Add your entity to this file in order to enable odata methods.
 * Please make sure your entity also exists in the odata-context.ts 
 * file under the entites property.
 * </Summary> 
 */
@Injectable({
  providedIn: 'root',
})
export default class DataService {
    PokeTrainer!: DataStore<PokeTrainer>;

    constructor(odataContext: OdataContext) {
        this.PokeTrainer = this.buildContext('PokeTrainer', odataContext);
    }

    private buildContext<T>(endpoint: string, odataContext: OdataContext): DataStore<T> {
        return new DataStore<T>({
            endpoint: endpoint
        } as OdataConfiguration, odataContext);
    }
}