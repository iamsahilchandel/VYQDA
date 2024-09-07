import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
    <Toaster position="top-right" />
  </StrictMode>
);
