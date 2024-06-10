import { manage } from 'manate';

export class Store {
  public publicUrl = '';
}

const store = manage(new Store());

export default store;
