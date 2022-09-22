import { MetaTags } from '@redwoodjs/web'

import NewBookmark from 'src/components/Bookmark/NewBookmark'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <NewBookmark />
    </>
  )
}

export default HomePage
