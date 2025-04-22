import React from 'react';

import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './home';
import FeaturedArticles from './FeaturedArticles'; 
 
 
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
