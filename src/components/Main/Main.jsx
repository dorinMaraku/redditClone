import './Main.css'
import Posts from './Posts/Posts'
import Header from "./header/Header"

const Main = () => {
  return (
    <main className="main">
        <Header />
        <Posts />
    </main>
  )
}

export default Main