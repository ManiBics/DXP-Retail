export const combineCMSData = (productListing, data) => {
  if (productListing?.length && data?.lineItems?.length) {
    const lineItems = data.lineItems.map((item) => {
      const findProduct = productListing.find(
        (product) => product.productTitle === item?.variant?.sku
      );
      return {
        ...item,
        price: (item?.price?.value?.centAmount / 100).toFixed(2),
        pricevalue: findProduct?.pricevalue,
        name: findProduct?.productTitle1,
        description: findProduct?.productDescription,
        quantity: item.quantity,
        image: findProduct?.productImage?.src,
        imageId: findProduct?.productImage?.id,
        sku: item?.variant?.sku,
        id: item.id,
        currency: findProduct?.currency,
        CMSId: findProduct?.id,
      };
    });
    return lineItems;
  } else if (!data || !data?.lineItems?.length) {
    return [];
  }
};
