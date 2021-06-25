import { ExternalClient, InstanceOptions, IOContext } from "@vtex/api";

export default class catolog extends ExternalClient {
    constructor(context: IOContext, options?: InstanceOptions) {
      super('http://colgatedireto.myvtex.com', context, options)

    }

    public async getProducts(search: string): Promise<any[]> {

      if (search == "all") return this.http.get('/api/catalog_system/pub/products/search/');

      return this.http.get(`/api/catalog_system/pub/products/search/?${search}`);

    }
}