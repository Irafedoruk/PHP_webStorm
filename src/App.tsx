import './App.css'
import CategoriesPage from "./components/categories/CategoriesPage.tsx";
import {Route, Routes} from "react-router-dom";
import CategoryCreatePage from "./components/create";
import ProductListPage from "./components/product/list/ProductListPage.tsx";
import ProductCreatePage from "./components/product/ProductCreatePage.tsx";
function App() {


    return (
        <>
            <Routes>
                <Route path="/" >
                    <Route index element={<CategoriesPage />} />
                    <Route path={"create"} element={<CategoryCreatePage/>} />
                    <Route path={"products/:id"} element={<ProductListPage/>}/>
                    <Route path="products/:id/create" element={<ProductCreatePage />} />
                </Route>
            </Routes>
        </>
    )
}

export default App
