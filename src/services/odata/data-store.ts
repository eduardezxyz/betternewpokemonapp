import ODataStore from 'devextreme/data/odata/store';
import { BehaviorSubject, Subject } from 'rxjs';
import { OdataContext } from './odata-context';

/**
 * <Summary>
 * This is the behaviour provider, remains untoched 
 * unless we need to integrate common odata functionality.
 * To add a new controller to list, please go to 
 * odata-context.ts and data.service.ts
 * </Summary> 
 */
export class DataStore<T> {
  public dataStore!: ODataStore;

  private listSubject = new BehaviorSubject<Array<T>>([{} as T]);
  public list$ = this.listSubject.asObservable();

  private currentSubject = new BehaviorSubject<T>({} as T);
  public currentSubject$ = this.currentSubject;

  constructor(config: OdataConfiguration, private odataContext: OdataContext) {
    this.dataStore = this.odataContext.context[config.endpoint];
  }
  
  getSubjectList() {
    return this.list$;
  }

  async getSubject() {
    return await this.currentSubject.value;
  }

  async setCurrentSubject(Id: number) {
    let subject = await this.dataStore.byKey(Id);
    this.currentSubject$.next(subject);
  }

  async get(configuration = {}): Promise<Array<T>> {
    let list = await this.dataStore.load(configuration);
    this.listSubject.next(list);
    return list;
  }

  async byKey(Id: number): Promise<T> {
    let subject = await this.dataStore.byKey(Id);
    return subject;
  }

  async patch(key: any, entity: T): Promise<T> {
    return await this.dataStore.update(key, entity);
  }

  async post(entity: T): Promise<T> {
      return await this.dataStore.insert(entity);
  }

  async put(key: any, entity: T): Promise<T> {
      return await this.dataStore.update(key, entity);
  }

  async delete(key: any) {
      return await this.dataStore.remove(key);
  }
}

export enum ODataFilterCompareOptions {
  Equals = 'eq',
  NotEquals = 'ne',
  GreaterThan = 'gt',
  GreaterThanOrEquals = 'ge',
  LessThan = 'lt',
  LessThanOrEquals = 'le',
  And = 'and',
  Or = 'or',
  Not = 'not',
  Has = 'has',
  In = 'in',
  StringContains = "contains"
}

export interface ODataFilterOption {
  field: string
  comparator: ODataFilterCompareOptions
  value: any
}

export interface ODataQueryOptions {
  filter?: Array<ODataFilterOption>
  expand?: Array<string>
  select?: Array<string>
  orderBy?: Array<string | { field: string, desc: boolean }>
  skip?: number
  top?: number
  count?: boolean
}

export interface ODataListResponse<T> {
  value: T[]
  count: number
}

export interface OdataConfiguration {
  endpoint: string;
}