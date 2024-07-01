export class ProductServices {
    static async getProducts() {
      try {
        const response = await fetch('https://api.chec.io/v1/products', {
          method: 'GET',
          headers: {
            'X-Authorization': 'pk_56863bdbdc768628139ebe3d8571c9e7a245de1d76b2e',
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        return data.data;
      } catch (error) {
        console.error('Something went wrong while fetching products:', error);
        return [];
      }
    }
  
    static async getProductById(id: string) {
      try {
        const response = await fetch(`https://api.chec.io/v1/products/${id}`, {
          method: 'GET',
          headers: {
            'X-Authorization': 'pk_56863bdbdc768628139ebe3d8571c9e7a245de1d76b2e',
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch product with id ${id}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(`Something went wrong while fetching product with id ${id}:`, error);
        return null;
      }
    }
  
    static async getCategory(id: string) {
      try {
        const response = await fetch(`https://api.chec.io/v1/categories/${id}`, {
          method: 'GET',
          headers: {
            'X-Authorization': 'pk_56863bdbdc768628139ebe3d8571c9e7a245de1d76b2e',
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch category with id ${id}`);
        }
        const data = await response.json();
        return data.slug;
      } catch (error) {
        console.error(`Something went wrong while fetching category with id ${id}:`, error);
        return null;
      }
    }
  
    static async addToCart(prodId: any) {
      try {
        const response = await fetch('https://api.chec.io/v1/carts/cart_BkyN5Yj40el0b6', {
          method: 'POST',
          headers: {
            'X-Authorization': 'pk_56863bdbdc768628139ebe3d8571c9e7a245de1d76b2e',
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            id: prodId,
            quantity: 1,
          }),
        });
        if (!response.ok) {
          throw new Error('Failed to add to cart');
        }
        return response.json();
      } catch (error) {
        console.error(`Something went wrong while adding product with id ${prodId} to cart:`, error);
        return null;
      }
    }
  
    static async removeCartItem(prodId: string) {
      try {
        const response = await fetch(`https://api.chec.io/v1/carts/cart_BkyN5Yj40el0b6/items/${prodId}`, {
          method: 'DELETE',
          headers: {
            'X-Authorization': 'pk_56863bdbdc768628139ebe3d8571c9e7a245de1d76b2e',
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            cart_id: 'cart_BkyN5Yj40el0b6',
            id: prodId,
          }),
        });
        if (!response.ok) {
          throw new Error(`Failed to remove product with id ${prodId} from cart`);
        }
        return response.json();
      } catch (error) {
        console.error(`Something went wrong while removing product with id ${prodId} from cart:`, error);
        return null;
      }
    }
  
    static async fetchingCartProducts() {
      try {
        const response = await fetch('https://api.chec.io/v1/carts/cart_BkyN5Yj40el0b6', {
          method: 'GET',
          headers: {
            'X-Authorization': 'pk_56863bdbdc768628139ebe3d8571c9e7a245de1d76b2e',
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch cart products');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Something went wrong while fetching cart products:', error);
        return null;
      }
    }
  }
  