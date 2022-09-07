import { SignIn } from '@clerk/clerk-react'

import { MetaTags } from '@redwoodjs/web'

const SignInPage = () => {
  return (
    <>
      <MetaTags title="SignIn" description="SignIn page" />

      <SignIn />
    </>
  )
}

export default SignInPage
