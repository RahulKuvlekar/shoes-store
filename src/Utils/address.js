import { doc, getDoc } from "firebase/firestore";
import { db } from "../Config/InitFirebase";
import { ADD_TOAST, SHOES_STORE_USER, WARNING } from "../Constant/constant";
import { createToast } from "./toast";

export const getUserAddress = async (
  userInfo,
  setUserAddress,
  dispatchToast
) => {
  try {
    const docRef = doc(db, SHOES_STORE_USER, userInfo.uid);
    const dataRef = await getDoc(docRef);
    if (dataRef.exists()) {
      setUserAddress(dataRef.data().myAddress);
    }
  } catch (error) {
    dispatchToast({
      type: ADD_TOAST,
      payload: createToast(WARNING, error.message),
    });
  }
};
