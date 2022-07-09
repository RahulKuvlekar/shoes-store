import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Config/InitFirebase";

export const signUpUser = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const loginUser = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const signOutUser = () => signOut(auth);

export const updateUserProfile = (
  currentUser,
  displayName = "",
  photoURL = "",
  phoneNumber = ""
) => updateProfile(currentUser, { displayName, photoURL, phoneNumber });
