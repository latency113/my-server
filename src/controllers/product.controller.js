const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.get = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        Category: true,
      },
    });

    res.json(products);
  } catch (error) {
    res.json(error);
  }
};
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      Where: {
        id: parseInt(id),
      },
    });

    res.json(product);
  } catch (error) {
    req.json(error);
  }
};
exports.create = async (req, res) => {
  try {
    const { category_id, name, price, description, unit_in_stock } = req.body;
    const product = await prisma.product.create({
      data: {
        category_id,
        name,
        price,
        description,
        unit_in_stock,
      },
    });
    res.json(product);
  } catch (error) {
    res.json(error);
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { category_id, name, price, description, unit_in_stock } = req.body;
    const product = await prisma.product.update({
      where: {
        id: parseInt(id),
      },
      data: {
        category_id,
        name,
        price,
        description,
        unit_in_stock,
      },
    });
    res.json(product);
  } catch (error) {
    res.json(error);
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json(product);
  } catch (error) {
    res.json(error);
  }
};
