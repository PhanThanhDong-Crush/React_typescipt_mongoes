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
import { ICategory, IComment, IProduct, ISignIn, ISignUp } from './types/interface';
import { sign_in, sign_up } from './api/sign';
import { apiAddComment } from './api/comment';
import { StatisticsCommentPro } from './admin/Comment/StatisticsCommentPro';
import { CommentProdetail } from './admin/Comment/commentProDetail';
import NotFound from './pages/NotFound';

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
    apiDeletePro(id).then(() => setProducts(products.filter(pro => pro._id !== id))).catch((error) => console.log(error.message))
    alert("Delete successfully")
  }
  const OnHandleDeleteCategory = (id: any) => {
    apiDeleteCate(id).then(() => setCategories(categories.filter(cate => cate._id !== id))).catch((error) => console.log(error.message))
    alert("Delete successfully")
  }

  const OnHandleCategory_Product = (_id: any) => {
    apiAllPro().then(({ data }) => setProducts(data.filter((pro: IProduct) => pro.categoryId._id === _id)))
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

  const onClickAddCate = async (category: ICategory) => {
    await apiAddCate(category)
    apiAllCate().then(({ data }) => setCategories(data)).catch((error) => console.log(error.message))
  }

  const onClickEditCate = async (category: ICategory) => {
    await apiEditCate(category)
    apiAllCate().then(({ data }) => setCategories(data))
  }

  const onClickSignIn = async (user: ISignIn) => {
    await sign_in(user)
      .then(res => {
        localStorage.setItem("token", res.data.accessToken);
        const user = JSON.stringify(res.data.user);
        localStorage.setItem("user", user);
      })
    location.reload()
  }

  const onClickSignUp = async (user: ISignUp) => {
    await sign_up(user)
      .then(res => { console.log(res.data.message); })
  }

  const OnClickAddComment = async (comment: IComment) => {
    await apiAddComment(comment)
  }

  const userJson: any = localStorage.getItem('user');
  const user = JSON.parse(userJson);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Client />}>
            <Route index element={<HomePage />} />
            <Route path='shop' element={<Shop products={products} categories={categories} filterCategory={OnHandleCategory_Product} />} />
            <Route path='product/:id' element={<ProductDetail products={products} addCommet={OnClickAddComment} />} />
            <Route path='sign_in' element={<SignIn submitSignIn={onClickSignIn} />} />
            <Route path='sign_up' element={<SignUp submitSignUp={onClickSignUp} />} />
          </Route>
          {(user !== null && user.role == "admin") ?
            <Route path='/admin' element={<Admin />}>
              <Route index element={<DarhBoash />} />
              <Route path='products'>
                <Route index element={<Products products={products} deleteProduct={OnHandleDeleteProduct} BigMall={BigMallProducts} MallBig={MallBigProducts} categories={categories} filterCategory={OnHandleCategory_Product} />} />
                <Route path='add' element={<ProductAdd addPro={onClickAddPro} categories={categories} />} />
                <Route path=':id' element={<ProductEdit editPro={onClickEditPro} categories={categories} products={products} />} />
              </Route>
              <Route path='categories'>
                <Route index element={<Categories categories={categories} deleteCategory={OnHandleDeleteCategory} />} />
                <Route path='add' element={<CategoryAdd addCate={onClickAddCate} />} />
                <Route path=':id' element={<CategoryEdit editCate={onClickEditCate} />} />
              </Route>
              <Route path='comment'>
                <Route index element={<StatisticsCommentPro />} />
                <Route path=':id' element={<CommentProdetail />} />
              </Route>
            </Route> :
            < Route path='/admin' element={<NotFound />} />}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
