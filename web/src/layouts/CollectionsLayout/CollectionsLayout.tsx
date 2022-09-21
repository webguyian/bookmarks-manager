import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type CollectionLayoutProps = {
  children: React.ReactNode
}

const CollectionsLayout = ({ children }: CollectionLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link
            to={routes.collections()}
            className="rw-link"
          >
            Collections
          </Link>
        </h1>
        <Link
          to={routes.newCollection()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New Collection
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default CollectionsLayout
