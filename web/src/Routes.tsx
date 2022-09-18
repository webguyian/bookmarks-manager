// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set, Private } from '@redwoodjs/router'

import BookmarksLayout from 'src/layouts/BookmarksLayout'

import CommonLayout from './layouts/CommonLayout/CommonLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={BookmarksLayout} private unauthenticated="signIn">
        <Route path="/bookmarks/new" page={BookmarkNewBookmarkPage} name="newBookmark" />
        <Route path="/bookmarks/{id:Int}/edit" page={BookmarkEditBookmarkPage} name="editBookmark" />
        <Route path="/bookmarks/{id:Int}" page={BookmarkBookmarkPage} name="bookmark" />
        <Route path="/bookmarks" page={BookmarkBookmarksPage} name="bookmarks" />
      </Set>
      <Set wrap={CommonLayout}>
        <Route path="/sign-in" page={SignInPage} name="signIn" />
        <Private unauthenticated="signIn">
          <Route path="/" page={HomePage} name="home" />
        </Private>
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
