import { Route, Routes } from "react-router-dom"
import { NavidadPage } from "../pages/NavidadPage"


export const AppRouter = () => {
  return (
    <>
        <Routes>
            <Route path="/navidad" element={<NavidadPage/>} />
        </Routes>
    </>
  )
}
