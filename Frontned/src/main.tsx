import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {ClerkProvider} from "@clerk/clerk-react";
import "bootstrap/dist/css/bootstrap.css"
import "./base.scss"
import {BrowserRouter} from "react-router-dom";
import {SideBarProvider} from "./Context/SidebarContext.tsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY


if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <ClerkProvider publishableKey={PUBLISHABLE_KEY} >
              <SideBarProvider>
                <App />
              </SideBarProvider>
          </ClerkProvider>
      </BrowserRouter>
  </StrictMode>,
)
