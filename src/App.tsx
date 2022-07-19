import { Route, BrowserRouter as Router, Routes as Switch } from 'react-router-dom';
import './UI/css/index.scss';
import Dashboard from './pages/dashboard';
import Blog from './pages/blog';
import { useEffect, useState } from 'react';
import Header from './pages/molecules/header';

function App() {
  const [posts, setPosts] = useState<any>([])
  useEffect(() => {
    let urlPosts = 'http://18.170.155.126/wp-json/wp/v2/posts'
    fetch(urlPosts)
      .then(res => res.json())
      .then(data => {
        setPosts(data)
      })
  }, [])
  return (
    <div className="App">

      <Router>
        <Header />
        <Switch>
          <Route path="/" element={<Dashboard />} />
          <Route path="/blog" element={<Blog posts={posts} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
