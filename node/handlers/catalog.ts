// node/handler/analytics.ts
export async function catalog(ctx: Context, next: () => Promise<any>) {
    const {
        clients: { catalog },
        vtex: {
            route: { params }
        }
    } = ctx;

    const { search } = params;

    const resp : any = await catalog.getProducts(String(search))

    ctx.status = 200
    ctx.body = JSON.stringify(resp);

    await next();
  }