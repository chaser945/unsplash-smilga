import { useState } from "react"

const ImgCard = ({ photo }) => {
  const [displayAuthor, setDisplayAuthor] = useState(false)
  const {
    urls: { regular: img_url },
    alt_description,
    user: { name },
  } = photo
  return (
    <article
      className="img-card"
      onMouseOver={() => setDisplayAuthor(true)}
      onMouseLeave={() => setDisplayAuthor(false)}
    >
      <img src={img_url} alt={alt_description} />
      <p className={`author-name ${displayAuthor && "active"}`}>{name}</p>
    </article>
  )
}
export default ImgCard
