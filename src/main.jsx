import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles.css'
import './styles-premium.css'
import './styles-editorial.css'
import './styles-homepage-ribbon-contact.css'

document.documentElement.classList.add('js') // enables the scroll-reveal styles; without JS everything is visible
createRoot(document.getElementById('root')).render(<App />)
