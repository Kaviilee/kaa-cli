import React from 'react'
import { HashRouter as Router } from 'react-router-dom';
import { routes, renderRoutes } from '@/router/index';

import '@/styles/index.css'

function App() {
  return <Router>{renderRoutes(routes)}</Router>;
}

export default App;
