"use client"

import { useEffect, useMemo, useState } from "react"
import data from "../books.json"
import { Book } from "@/types.d"

const books: Book[] = data.library.map((data) => data.book)
const genres: Book["genre"][] = Array.from(
  new Set(books.map((book) => book.genre))
)

const api = {
  readList: {
    update: (readList: Book["ISBN"][]) =>
      localStorage.setItem("readList", JSON.stringify(readList)),
    onChange: (callback: (book: Book["ISBN"][]) => void) => {
      function getReadList() {
        const readList = JSON.parse(
          localStorage.getItem("readList") ?? "[]"
        ) as Book["ISBN"][]

        callback(readList)
      }

      window.addEventListener("storage", getReadList)

      getReadList()

      return () => window.removeEventListener("storage", getReadList)
    }
  }
}

export default function HomeClientPage({
  books,
  genres
}: {
  books: Book[]
  genres: Book["genre"][]
}) {
  const [genre, setGenre] = useState<Book["genre"]>("")
  // const [readList, setReadList] = useState<Set<Book["ISBN"][]>>(() => new Set())
  const [readList, setReadList] = useState<Book["ISBN"][]>([])

  const matches = useMemo(() => {
    if (!genre) return books
    return books.filter((book) => {
      if (book.genre !== genre) return false
      return true
    })
  }, [genre])

  function handleBookClick(book: Book["ISBN"]) {
    const draft = readList.includes(book)
      ? readList.filter((readBook) => readBook !== book)
      : [...readList, book]

    setReadList(draft)
    api.readList.update(draft)
    // const draft = structuredClone(readList)

    // if (draft.has(book)) {
    //   delete book
    // } else {
    //   draft.add(book)
    // }

    // setReadList(draft)
  }

  useEffect(() => {
    const unsubscribe = api.readList.onChange(setReadList)

    return () => unsubscribe()
  }, [])
  return (
    <article className="grid gap-4">
      <nav>
        <select value={genres} onChange={(evt) => setGenre(evt.target.value)}>
          <option value="">Todos</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </nav>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))]  gap-4">
        {matches.map((book) => (
          <li
            key={book.ISBN}
            className="grid gap-2"
            onClick={() => handleBookClick(book.ISBN)}
          >
            <img
              className="aspect-[9/14] object-cover"
              src={book.cover}
              alt={book.title}
            />
            <p>
              {readList.includes(book.ISBN) && <span>⭐️ </span>}
              {book.title}
            </p>
          </li>
        ))}
      </ul>
    </article>
  )
}
