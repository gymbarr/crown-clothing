import { useState, useContext } from "react"

import FormInput from "../form-input/form-input"
import Button from "../button/button"

import { UserContext } from "../../contexts/user"

import {
  signInAuthWithEmailAndPassword,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase"

import "./sign-in-form.scss"

const defaultFormFields = {
  email: "",
  password: "",
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields;

  const { setCurrentUser } = useContext(UserContext);

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const { user } = await signInAuthWithEmailAndPassword(email, password)
      await createUserDocumentFromAuth(user)
      setCurrentUser(user)

      resetFormFields()
    } catch (error) {
      if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        alert('Incorrect email or password')
      } else {
      console.log("user signing in encountered an error", error)
      }
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormFields({ ...formFields, [name]: value })
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup()
    await createUserDocumentFromAuth(user)
    setCurrentUser(user)
  }

  return (
    <div className="sign-in-container">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm;