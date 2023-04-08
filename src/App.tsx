import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Client } from './layouts/client';
import { HomePage } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { SignIn } from './pages/Sign_in';
import { SignUp } from './pages/Sign_up';
import { Admin } from './layouts/admin';
import { DarhBoash } from './admin/Darhboash';
import { Products } from './admin/Product/Products';
import { ProductAdd } from './admin/Product/Product_add';
import { ProductEdit } from './admin/Product/Product_edit';
import { Categories } from './admin/Category/Categories';
import { CategoryAdd } from './admin/Category/Category_add';
import { CategoryEdit } from './admin/Category/Category_edit';
import { apiAddCate, apiAllCate, apiDeleteCate, apiEditCate } from './api/category';
import { apiAddPro, apiAllPro, apiDeletePro, apiEditPro } from './api/product';
import { ICategory, IProduct } from './types/interface';

function App() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  useEffect(() => {
    apiAllCate()
      .then(({ data }) => setCategories(data))
      .catch((error) => console.log(error))
  }, [])

  const [products, setProducts] = useState<IProduct[]>([]);
  useEffect(() => {
    apiAllPro()
      .then(({ data }) => setProducts(data))
      .catch((error) => console.log(error))
  }, [])

  const OnHandleDeleteProduct = (id: any) => {
    apiDeletePro(id).then(() => setProducts(products.filter(pro => pro._id !== id))).catch((error) => console.log(error))
    alert("Delete successfully")
  }
  const OnHandleDeleteCategory = (id: any) => {
    apiDeleteCate(id).then(({ data }) => console.log(data))
    alert("Delete successfully")
  }

  const OnHandleCategory_Product = (_id: any) => {
    apiAllPro().then(({ data }) => setProducts(data.filter((pro: IProduct) => pro.categoryId._id === _id)));
    console.log(products);

  }

  const BigMallProducts = () => {
    apiAllPro().then(({ data }) => setProducts(data.sort((a: IProduct, b: IProduct) => a.price - b.price)));
  }
  const MallBigProducts = () => {
    apiAllPro().then(({ data }) => setProducts(data.sort((a: IProduct, b: IProduct) => b.price - a.price)));
  }

  const onClickAddPro = async (product: IProduct) => {
    await apiAddPro(product)
    apiAllPro().then(({ data }) => setProducts(data))
  }

  const onClickEditPro = async (product: IProduct) => {
    await apiEditPro(product)
    apiAllPro().then(({ data }) => setProducts(data))
  }

  // const onClickSignIn = async (user) => {
  //   await signin(user)
  //     .then(res => {
  //       localStorage.setItem("token", res.data.accessToken);
  //       const user = JSON.stringify(res.data.user);
  //       localStorage.setItem("user", user);
  //     })
  // }

  // const onClickSignUp = async (user) => {
  //   await signup(user)
  //     .then(res => { console.log(res.data.message); })
  // }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Client />}>
            <Route index element={<HomePage />} />
            <Route path='shop' element={<Shop products={products} categories={categories} filterCategory={OnHandleCategory_Product} />} />
            <Route path='product/:id' element={<ProductDetail products={products} />} />
            <Route path='sign_in' element={<SignIn />} />
            <Route path='sign_up' element={<SignUp />} />
          </Route>

          <Route path='/admin' element={<Admin />}>
            <Route index element={<DarhBoash />} />
            <Route path='products'>
              <Route index element={<Products products={products} deleteProduct={OnHandleDeleteProduct} BigMall={BigMallProducts} MallBig={MallBigProducts} categories={categories} filterCategory={OnHandleCategory_Product} />} />
              <Route path='add' element={<ProductAdd addPro={onClickAddPro} categories={categories} />} />
              <Route path=':id' element={<ProductEdit editPro={onClickEditPro} categories={categories} products={products} />} />
            </Route>
            <Route path='categories'>
              <Route index element={<Categories categories={categories} deleteCategory={OnHandleDeleteCategory} />} />
              <Route path='add' element={<CategoryAdd />} />
              <Route path=':id' element={<CategoryEdit />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
