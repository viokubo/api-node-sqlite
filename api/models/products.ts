import { dbQuery } from "../services/db";
import { dbQueryFirst } from "./../services/db";

export type Product = {
  id: number;
  name: string;
  price: number;
};

const insertProduct = async (product: Product) => {
  await dbQuery("INSERT INTO product(name, price) VALUES (?,?)", [
    product.name,
    product.price,
  ]);
  const retorno = await dbQuery(
    "SELECT seq AS id FROM sqlite_sequence WHERE name = 'product'"
  );
  return findById(retorno[0].id);
};

const updateProduct = async (product: Product) => {
  await dbQuery("UPDATE product SET name = ?, price = ? WHERE id = ?", [
    product.name,
    product.price,
    product.id,
  ]);

  return findById(product.id);
};

const listProducts = async () => {
  const retorno = await dbQuery("SELECT * FROM product");
  return retorno as Product[];
};

const findById = async (id: number) => {
  const product = await dbQueryFirst("SELECT * FROM product WHERE id = ?", [
    id,
  ]);
  return product as Product | undefined;
};

const deleteById = async (id: number) => {
  await dbQueryFirst("DELETE FROM product WHERE id = ?", [id]);
};

export const productModel = {
  deleteById,
  insertProduct,
  listProducts,
  findById,
  updateProduct,
};
