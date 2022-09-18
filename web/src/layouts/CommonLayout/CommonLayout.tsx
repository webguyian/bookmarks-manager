import { UserButton } from '@clerk/clerk-react'

import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'

type CommonLayoutProps = {
  children?: React.ReactNode
}

const CommonLayout = ({ children }: CommonLayoutProps) => {
  const { isAuthenticated } = useAuth()

  return (
    <>
      <header className="mb-6 flex items-center justify-between bg-emerald-200 py-2 px-6">
        <h1 className="text-lg font-semibold">
          <Link
            to={routes.home()}
            className="text-emerald-700 hover:text-emerald-800"
          >
            Bookmarks Manager
          </Link>
        </h1>
        {isAuthenticated ? (
          <UserButton afterSignOutUrl={routes.signIn()} />
        ) : (
          <Link to={routes.signIn()}>Sign in</Link>
        )}
      </header>
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center">
        {children}
      </div>
    </>
  )
}

export default CommonLayout
