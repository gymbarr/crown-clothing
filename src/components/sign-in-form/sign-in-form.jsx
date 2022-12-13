import { useState } from "react"

import FormInput from "../form-input/form-input"
import Button, { BUTTON_TYPE_CLASSES } from "../button/button"

import {
  signInAuthWithEmailAndPassword,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase"

import { SignInContainer, ButtonsContainer } from "./sign-in-form.styles"

const defaultFormFields = {
  email: "",
  password: "",
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const { user } = await signInAuthWithEmailAndPassword(email, password)

      resetFormFields()
    } catch (error) {
      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        alert("Incorrect email or password")
      } else {
        console.log("user signing in encountered an error", error)
      }
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormFields({ ...formFields, [name]: value })
  }

  const signInWithGoogle = async () => {
    await signInWithGooglePopup()
  }

  return (
    <SignInContainer>
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
        <ButtonsContainer>
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
          >
            Google Sign In
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  )
}

export default SignInForm
