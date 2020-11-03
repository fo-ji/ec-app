import { db, FirebaseTimestamp } from "../../firebase";
import { push } from "connected-react-router";
import { deleteProductsAction, fetchProductsAction } from "./actions"

const productsRef = db.collection("products")

export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    productsRef.doc(id).delete()
      .then(() => {
        const prevProducts = getState().products.list;
        const nextProducts = prevProducts.filter(product => product.id !== id);
        dispatch(deleteProductsAction(nextProducts));
      })
  }
}

export const fetchProducts = () => {
  return async (dispatch) => {
    productsRef.orderBy("update_at", "desc").get()
      .then(snapshots => {
        const productList = [];
        snapshots.forEach(snapshot => {
          const product = snapshot.data();
          productList.push(product)
        })
        dispatch(fetchProductsAction(productList));
      })
  }
}

export const orderProduct = (productsInCart, amount) => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid
    const userRef = db.collection("users").doc(uid)
    const timestamp = FirebaseTimestamp.now()

    let products = [],
        soldOutsProducts = [];

    const batch = db.batch()

    for (const product of productsInCart) {
      const snapshot = await productsRef.doc(product.productId).get()
      const sizes = snapshot.data().sizes

      const updatedSizes = sizes.map(size => {
        if (size.size === product.size) {
          if (size.quantity === 0)
          soldOutsProducts.push(product.name)
          return size;
        }
        return {
          size: size.size,
          quantity: size.quantity - 1
        }
      })

      products.push({
        id: product.productId,
        images: product.images,
        name: product.name,
        price: product.price,
        size: product.size        
      })

      batch.update(
        productsRef.doc(product.productId),
        {sizes: updatedSizes}
      )

      batch.delete(
        userRef.collection("cart").doc(product.cartId)
      )
    }

    if (soldOutsProducts.length > 0) {
      const errorMessage = (soldOutsProducts.length > 1) ?
                            soldOutsProducts.join("と") :
                            soldOutsProducts[0];
      alert("大変申し訳ありません。" + "が在庫切れの為、注文処理を中断しました。")
      return false
    } else {
      batch.commit()
        .then(() => {
          const orderRef = userRef.collection("orders").doc()
          const date = timestamp.toDate()
          const shippingDate = FirebaseTimestamp.fromDate(new Date(date.setDate(date.getDate() + 3)))

          const history = {
            amount: amount,
            created_at: timestamp,
            id: orderRef.id,
            products: products,
            shipping_date: shippingDate,
            updated_at: timestamp
          };

          orderRef.set(history)
          dispatch(push("/order/complete"))

        }).catch(() => {
          alert("注文処理に失敗しました。通信環境をご確認の上、もう一度お試しください。")
          return false
        })
    }
  }
}

export const saveProduct = (id, name, description, category, gender, price, images, sizes) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();

    const data = {
      category: category,
      description: description,
      images: images,
      gender: gender,
      name: name,
      price: parseInt(price, 10),
      sizes: sizes,
      update_at: timestamp
    }

    if (id === "") {
      const ref = productsRef.doc();
      id = ref.id;
      data.id = id;
      data.created_at = timestamp
    }

    return productsRef.doc(id).set(data, {merge: true})
      .then(() => {
        dispatch(push("/"))
      }).catch((error) => {
        throw new Error(error)
      })
  }
}