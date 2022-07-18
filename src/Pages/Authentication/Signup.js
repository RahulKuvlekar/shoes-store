import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./Auth.css";
import SmallLoader from "../../Components/UI/SmallLoader/SmallLoader";
import Loader from "../../Components/UI/Loader/Loader";
import { useAuthContext } from "../../Hooks/useAuthContext";
import {
  signOutUser,
  signUpUser,
  updateUserProfile,
} from "../../Utils/authentication";
import { createToast } from "../../Utils/toast";
import {
  ADD_TOAST,
  DANGER,
  INFO,
  SHOES_STORE_USER,
} from "../../Constant/constant";
import { useToastContext } from "../../Hooks/useToastContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../Config/InitFirebase";

const Signup = () => {
  const INITIAL_VAL = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formValue, setFormValue] = useState(INITIAL_VAL);
  const [formError, setFormError] = useState(INITIAL_VAL);
  const [isSubmit, setIsSubmit] = useState(false);
  const [imgLoader, setImgLoader] = useState(true);
  const { isAuthenticated, userLoading, setUserLoading } = useAuthContext();
  const { dispatchToast } = useToastContext();

  const navigate = useNavigate();

  const inputHandler = (event) => {
    const { name, value } = event.target;
    setFormValue((prev) => ({
      ...prev,
      [name]: value,
    }));
    setIsSubmit(false);
  };
  const resetHandler = (event) => {
    setFormValue(INITIAL_VAL);
    setFormError({});
    setIsSubmit(false);
  };

  const validate = ({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  }) => {
    const error = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!firstName) error.firstName = "Firstname is required*";

    if (!lastName) error.lastName = "Lastname is required*";

    if (!email) error.email = "Email Id is required*";
    else if (!regex.test(email)) error.email = "Enter Valid Email-Id";

    if (!password) error.password = "Password is required*";
    else if (password.length < 7)
      error.password = "Password length should be greater than 7";

    if (!confirmPassword)
      error.confirmPassword = "Confirm password is required*";
    else if (password !== confirmPassword)
      error.confirmPassword = "Password doesn't match";

    return error;
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setFormError(validate(formValue));
    setIsSubmit(true);
  };

  const focusHandler = (event) => {
    setFormError({});
    setIsSubmit(false);
  };

  const SignupService = async (emailId, password) => {
    try {
      setUserLoading(true);
      const currentUser = await signUpUser(emailId, password);
      if (currentUser?.user) {
        await signOutUser();

        dispatchToast({
          type: ADD_TOAST,
          payload: createToast(INFO, "User Account Created Successfully 🎉"),
        });

        navigate("/login", { replace: true });

        await updateUserProfile(
          currentUser?.user,
          formValue?.firstName + " " + formValue?.lastName
        );

        const ref = doc(db, SHOES_STORE_USER, currentUser?.user?.uid);
        await setDoc(ref, {
          uid: currentUser?.user?.uid,
          displayName: formValue?.firstName + " " + formValue?.lastName,
          email: currentUser?.user?.email,
          photoURL: currentUser?.user?.photoURL,
          phoneNumber: currentUser?.user?.phoneNumber,
        });
      }
    } catch (error) {
      setFormError((prev) => ({ ...prev, signUpError: error.message }));
      dispatchToast({
        type: ADD_TOAST,
        payload: createToast(DANGER, error.message),
      });
    } finally {
      if (!isAuthenticated) setUserLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmit && Object.keys(formError).length === 0) {
      SignupService(formValue.email, formValue.password);
      resetHandler();
    }

    // eslint-disable-next-line
  }, [isSubmit]);

  if (isAuthenticated) return <Navigate to="/" replace />;
  return (
    <div className="authentication-section bg-signup">
      <div className="authentication-poster">
        {imgLoader && <Loader color="light" />}
        <img
          src="/Images/Extras/signupPoster.jpg"
          alt="poster"
          onLoad={() => {
            setImgLoader(false);
          }}
        />
      </div>

      <div className="signup">
        <form action="" className="form form-login" onSubmit={submitHandler}>
          <div className="input-group">
            <h1 className="text-grey-dk">SignUp Form</h1>
          </div>
          <div
            className={`input-group ${formError.firstName && "input-error"}`}
          >
            <label className="input-label">FirstName *</label>
            <input
              type="text"
              placeholder="Enter your Firstname"
              name="firstName"
              value={formValue?.firstName}
              onChange={inputHandler}
              onFocus={focusHandler}
            />
            {formError.firstName && (
              <p className="input-error-message text-sm">
                {formError.firstName}
              </p>
            )}
          </div>
          <div className={`input-group ${formError.lastName && "input-error"}`}>
            <label className="input-label">LastName *</label>
            <input
              type="text"
              placeholder="Enter your Lastname"
              name="lastName"
              value={formValue?.lastName}
              onChange={inputHandler}
              onFocus={focusHandler}
            />
            {formError.lastName && (
              <p className="input-error-message text-sm">
                {formError.lastName}{" "}
              </p>
            )}
          </div>
          <div className={`input-group ${formError.email && "input-error"}`}>
            <label className="input-label">Email Id *</label>
            <input
              type="text"
              placeholder="Enter Email Id"
              name="email"
              value={formValue?.email}
              onChange={inputHandler}
              onFocus={focusHandler}
            />
            {formError.email && (
              <p className="input-error-message text-sm">{formError.email} </p>
            )}
          </div>

          <div className={`input-group ${formError.password && "input-error"}`}>
            <label className="input-label">Password *</label>
            <input
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
              name="password"
              value={formValue?.password}
              onChange={inputHandler}
              onFocus={focusHandler}
            />
            {formError.password && (
              <p className="input-error-message text-sm">
                {formError.password}
              </p>
            )}
          </div>

          <div
            className={`input-group ${
              formError.confirmPassword && "input-error"
            }`}
          >
            <label className="input-label">Confirm Password *</label>
            <input
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
              name="confirmPassword"
              value={formValue?.confirmPassword}
              onChange={inputHandler}
              onFocus={focusHandler}
            />
            {formError.confirmPassword && (
              <p className="input-error-message text-sm">
                {formError.confirmPassword}
              </p>
            )}
          </div>

          {formError?.signUpError && (
            <div
              className={`input-group ${
                formError?.signUpError && "input-error"
              }`}
            >
              <p className="input-error-message text-md">
                {formError?.signUpError}
              </p>
            </div>
          )}

          <div className="input-group h4 text-grey-dk">
            <p>
              Already have account ?
              <Link to="/login" className="btn-link link-success">
                Login ?
              </Link>
            </p>
          </div>
          <button
            type="submit"
            className="btn btn-success"
            disabled={userLoading}
          >
            {userLoading ? <SmallLoader size="sm" /> : "Submit"}
          </button>
          <button
            type="reset"
            className="btn btn-success"
            onClick={resetHandler}
          >
            Reset
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
