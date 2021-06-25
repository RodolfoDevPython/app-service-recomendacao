// node/clients/index.ts
import { IOClients } from '@vtex/api'

import Catalog from './catalog';
import Cart from './cart';

export class Clients extends IOClients {

  public get catalog() {
    return this.getOrSet('catalog', Catalog)
  }

  public get cart() {
    return this.getOrSet('cart', Cart)
  }

  //Responsável por registrar o cliente de fato
}