import { db, FirebaseTimestamp } from "../../firebase";
import { push } from "connected-react-router";
import { fetchProductsAction } from "./actions"

const productsRef = db.collection("products")

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