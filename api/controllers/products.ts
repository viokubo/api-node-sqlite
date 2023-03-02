import { Request, Response } from "express";
import { Product, productModel } from "./../models/products";
import {
  BadRequest,
  InternalServerError,
  notFound,
  ok,
  validateNumber,
} from "./../services/util";

const insertProduct = (req: Request, res: Response) => {
  {
    const product = req.body;
    if (!product) return BadRequest(res, "Produto invalido");
  }

  const product = req.body as Product;
  productModel
    .insertProduct(product)
    .then((product) => res.json(product))
    .catch((err) => InternalServerError(res, err));
};

const updateProduct = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  {
    if (!validateNumber(id)) return BadRequest(res, "Id invalido");

    const product = req.body;
    if (!product) return BadRequest(res, "Produto invalido");

    const productSave = await productModel.findById(id);
    if (!productSave) return notFound(res);
  }

  const product = req.body as Product;
  return productModel
    .updateProduct(product)
    .then((product) => res.json(product))
    .catch((err) => InternalServerError(res, err));
};


const listProducts = (_req: Request, res: Response) => {
  productModel
    .listProducts()
    .then((products) => res.json(products))
    .catch((err) => InternalServerError(res, err));
};

const findById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  {
    if (!validateNumber(id)) return BadRequest(res, "Id invalido");
  }

  return productModel
    .findById(id)
    .then((product) => {
      if (product) return res.json(product);
      else return notFound(res);
    })
    .catch((err) => InternalServerError(res, err));
};

const deleteById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  {
    if (!validateNumber(id)) return BadRequest(res, "Id invalido");
  }

  return productModel
    .deleteById(id)
    .then(() => ok(res))
    .catch((err) => InternalServerError(res, err));
};

export const productController = {
  deleteById,
  insertProduct,
  listProducts,
  findById,
  updateProduct,
};
