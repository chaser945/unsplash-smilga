import { useState, useEffect } from "react"
import axios from "axios"
import ImgCard from "./components/ImgCard"

const App = () => {
  const [photos, setPhotos] = useState([])
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const fetchPhotos = async () => {
    let url = ""
    let baseUrl = ""
    const clientId = import.meta.env.VITE_CLIENT_ID

    if (query) {
      baseUrl = "https://api.unsplash.com/search/photos"
      url = `${baseUrl}?client_id=${clientId}&page=${page}&query=${query}`
    } else {
      baseUrl = "https://api.unsplash.com/photos"
      url = `${baseUrl}?client_id=${clientId}&page=${page}`
    }

    setLoading(true)

    try {
      const response = await axios(url, {
        headers: {
          "Accept-Version": "v1",
        },
      })
      // console.log(response)
      setPhotos((oldPhotos) => {
        if (query && page === 1) {
          return [...response.data.results]
        } else if (query) {
          return [...oldPhotos, ...response.data.results]
        } else {
          return [...oldPhotos, ...response.data]
        }
      })
      setLoading(false)
    } catch (error) {
      console.log(error.response)
      setError(true)
      setLoading(false)
    }
  }

  const scrollEvent = () => {
    if (
      !loading &&
      window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 5
    ) {
      setPage((oldPage) => {
        return oldPage + 1
      })
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", scrollEvent)
    return () => window.removeEventListener("scroll", scrollEvent)
  }, [])

  useEffect(() => {
    fetchPhotos()
  }, [page])

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchPhotos()
  }

  const handleChange = (e) => {
    setQuery(e.target.value)
  }

  if (error) {
    return <h1>An error was encountered.</h1>
  }

  return (
    <section className="app">
      <h1 className="title">unsplash images</h1>
      <form className="query-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          required
          placeholder="e.g; dog"
        />
        <button className="btn-search">search</button>
      </form>
      <div className="img-gallery">
        {photos.map((photo, index) => {
          const { id } = photo
          return <ImgCard key={index} photo={photo} />
        })}
      </div>
      {loading && <h1>Loading...</h1>}
      {photos.length < 1 && <h1>Please! provide a valid input.</h1>}
    </section>
  )
}
export default App
