import { db } from "../Config/InitFirebase";
import {
  ADD_TO_CART,
  ADD_TO_WISHLIST,
  DECREMENT_CART_QUANTITY,
  INCREMENT_CART_QUANTITY,
  REMOVE_FROM_CART,
  REMOVE_FROM_WISHLIST,
  SET_LOADING,
  SET_MY_CART,
  SET_MY_WISHLIST,
  SHOES_STORE_USER,
} from "../Constant/constant";
import {
  deleteField,
  doc,
  getDoc,
  increment,
  setDoc,
} from "firebase/firestore";

export const getDiscountedPrice = (price, percentage) =>
  ((price * (100 - percentage)) / 100).toFixed(2);

export const addToMyCart = async (dispatchproduct, product, uid) => {
  try {
    dispatchproduct({ type: SET_LOADING, payload: true });

    const docData = { ...product, quantity: 1 };
    const docRef = doc(db, SHOES_STORE_USER, uid);
    await setDoc(
      docRef,
      { myCart: { [docData.productId]: docData } },
      { merge: true }
    );

    dispatchproduct({ type: ADD_TO_CART, payload: docData });
  } catch (error) {
    console.log("ADD CART ERROR", error);
  } finally {
    dispatchproduct({ type: SET_LOADING, payload: false });
  }
};

export const removeFromMyCart = async (dispatchproduct, product, uid) => {
  try {
    dispatchproduct({ type: SET_LOADING, payload: true });

    const docRef = doc(db, SHOES_STORE_USER, uid);
    await setDoc(
      docRef,
      { myCart: { [product.productId]: deleteField() } },
      { merge: true }
    );

    dispatchproduct({ type: REMOVE_FROM_CART, payload: product });
  } catch (error) {
    console.log("REMOVE CART ERROR", error);
  } finally {
    dispatchproduct({ type: SET_LOADING, payload: false });
  }
};

export const addToMyWishlist = async (dispatchproduct, product, uid) => {
  try {
    dispatchproduct({ type: SET_LOADING, payload: true });

    const docRef = doc(db, SHOES_STORE_USER, uid);
    await setDoc(
      docRef,
      { myWishlist: { [product.productId]: product } },
      { merge: true }
    );

    dispatchproduct({ type: ADD_TO_WISHLIST, payload: product });
  } catch (error) {
    console.log("ADD WISHLIST ERROR", error);
  } finally {
    dispatchproduct({ type: SET_LOADING, payload: false });
  }
};

export const removeFromMyWishlist = async (dispatchproduct, product, uid) => {
  try {
    dispatchproduct({ type: SET_LOADING, payload: true });

    const docRef = doc(db, SHOES_STORE_USER, uid);
    await setDoc(
      docRef,
      { myWishlist: { [product.productId]: deleteField() } },
      { merge: true }
    );

    dispatchproduct({ type: REMOVE_FROM_WISHLIST, payload: product });
  } catch (error) {
    console.log("REMOVE WISHLIST ERROR", error);
  } finally {
    dispatchproduct({ type: SET_LOADING, payload: false });
  }
};

export const getMyCart = async (dispatchproduct, uid) => {
  try {
    dispatchproduct({ type: SET_LOADING, payload: true });

    const docRef = doc(db, SHOES_STORE_USER, uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      dispatchproduct({ type: SET_MY_CART, payload: data?.myCart });
    }
  } catch (error) {
    console.log("GET MY CART", error);
  } finally {
    dispatchproduct({ type: SET_LOADING, payload: false });
  }
};

export const getMyWishlist = async (dispatchproduct, uid) => {
  try {
    dispatchproduct({ type: SET_LOADING, payload: true });

    const docRef = doc(db, SHOES_STORE_USER, uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      dispatchproduct({
        type: SET_MY_WISHLIST,
        payload: data?.myWishlist,
      });
    }
  } catch (error) {
    console.log("GET MY CART", error);
  } finally {
    dispatchproduct({ type: SET_LOADING, payload: false });
  }
};

export const updateMyCart = async (dispatchproduct, product, uid, type) => {
  const PRODUCT_ID = product.productId;
  try {
    dispatchproduct({ type: SET_LOADING, payload: true });

    const docRef = doc(db, SHOES_STORE_USER, uid);
    if (type.toLowerCase() === "increment") {
      await setDoc(
        docRef,
        {
          myCart: { [PRODUCT_ID]: { quantity: increment(1) } },
        },
        { merge: true }
      );
      dispatchproduct({ type: INCREMENT_CART_QUANTITY, payload: product });
    } else if (type.toLowerCase() === "decrement") {
      await setDoc(
        docRef,
        {
          myCart: { [PRODUCT_ID]: { quantity: increment(-1) } },
        },
        { merge: true }
      );
      dispatchproduct({ type: DECREMENT_CART_QUANTITY, payload: product });
    }
  } catch (error) {
    console.log("UPDATE MY CART", error);
  } finally {
    dispatchproduct({ type: SET_LOADING, payload: false });
  }
};
