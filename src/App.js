import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserListView from "./components/UserListView";
import ProductListView from "./components/ProductListView";
import ProductDetailView from "./components/ProductDetailView";
import Header from "./components/Header";
import NewProductForm from "./components/NewProductForm";

import UserEditView from "./components/UserEditView";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* products start */}
        <Route exact path="/products/new" element={<NewProductForm />} />
        <Route exact path="/products/:id" element={<ProductDetailView />} />
        <Route exact path="/products/:id" element={<ProductDetailView />} />
        <Route
          exact
          path="/products/:id/edit"
          element={<ProductDetailView />}
        />
        <Route exact path="/products" element={<ProductListView />} />
        {/* products ends */}
        {/* user route start */}
        <Route exact path="/users" element={<UserListView />} />
        <Route exact path="/users/:id/edit" element={<UserEditView />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
