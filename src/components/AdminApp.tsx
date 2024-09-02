"use client"; // remove this line if you choose Pages Router
import { Admin, Resource } from "react-admin";

import { PostCreate, PostEdit, PostList } from "./Posts/Post";
import dataProvider from "@/dataprovider";
import { ProductCreate, ProductEdit, ProductList } from "./Products/Product";

const AdminApp = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name="banners"
      list={PostList}
      edit={PostEdit}
      create={PostCreate}
    />
    <Resource
      name="product"
      list={ProductList}
      edit={ProductEdit}
      create={ProductCreate}
    />
  </Admin>
);

export default AdminApp;
