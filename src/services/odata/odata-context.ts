import { Injectable } from '@angular/core';
import ODataContext from 'devextreme/data/odata/context';
import { environment } from 'src/environments/environment';
// import { environment } from '@environments/environment';
// import { AuthService } from '@modules/auth/auth.service';
// import { OAuthService } from 'angular-oauth2-oidc';
/**
 * <Summary>
 * Add your odata/$metadata entity name under entities with its key name and types
 * </Summary> 
 */
@Injectable({
  providedIn: 'root'
})
export class OdataContext{
  public oDataContext: ODataContext;

  constructor() { 
    this.oDataContext = new ODataContext({
      url: environment.apiUri + '/odata',
      version: 4,
      errorHandler(error) {
          // console.log('odata context error', error);
          if (error.httpStatus === 401) {
              // authService.logout();
          }
      },
      entities: {
        PokeTrainers: {
          key: 'Id',
          keyType: 'Int32'
        },
         
      }
    });
  }
  
  get context(): any {
    return this.oDataContext;
  }
}

