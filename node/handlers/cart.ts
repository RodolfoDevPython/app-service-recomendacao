import { json } from "co-body";


function buildUrl(products: any[]) {
    let query_string : string = "";

    const lenght : any = products.length - 1;

    for (let idx in products) {

        const { sku, qtd, seller, sc } = products[idx];

        if (idx == lenght) {
            query_string += `sku=${sku}&qty=${qtd}&seller=${seller}&sc=${sc}`    
        } else {
            query_string += `sku=${sku}&qty=${qtd}&seller=${seller}&sc=${sc}&`
        }
        
    }

    return query_string;

}

// node/handler/analytics.ts
export async function cart(ctx: Context, next: () => Promise<any>) {
    
    const {
        clients : { cart },
        req
    } = ctx;

    const products = await json(req);
    
    const query_string = buildUrl(products);

    const orderForm : any = await cart.getOrderForm();

    try {
        await cart.addCart(query_string, orderForm?.orderFormId);    
    } catch (error) {

        let err : any = error
        
        if ( String(err).includes("code 500") ) {
            ctx.body = JSON.stringify({ orderFormId: orderForm?.orderFormId, text: "problema ao inserir esses itens na sacola" });
        } else {
            ctx.body = JSON.stringify({ orderFormId: orderForm?.orderFormId, text: "itens inseridos com sucesso" });
        }
    }

    await next();

  }