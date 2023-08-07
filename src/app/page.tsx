import type { Book } from "@/types.d"
import dynamic from "next/dynamic"
import IndexLoading from "./loading"

const HomeClientPage = dynamic(() => import("./client"), {
  ssr: false,
  loading: IndexLoading
})
const api = {
  book: {
    list: (): Promise<Book[]> => {
      //testing laoding with timeout
      // return new Promise((resolve, reject) => {
      //   setTimeout(() => {
      //     resolve(
      //       import("../books.json").then((data) =>
      //         data.library.map((data) => data.book)
      //       )
      //     )
      //   }, 3000)
      // })

      return import("../books.json").then((data) =>
        data.library.map((data) => data.book)
      )
    }
  }
}
export default async function indexPage() {
  const books = await api.book.list()
  const genres: Book["genre"][] = Array.from(
    new Set(books.map((book) => book.genre))
  )
  return <HomeClientPage books={books} genres={genres} />
}
