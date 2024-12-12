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
      where: {
        id: parseInt(id),
      },
    });

    res.json(product);
  } catch (error) {
    res.json(error);
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

exports.orderBy = async (req,res) => {
  try {
    const {sort,order,limit} = req.body
    const product = await prisma.product.findMany({
      take: limit,
      orderBy:{[sort]:order},
      include:{Category: true}
    })
    res.json(product)
  } catch (error) {
    res.json(error)
  }
}


exports.filter = async (req,res) => {
  try {
    const { query, category, price} = req.body
    if(query){
      const products = await prisma.product.findMany({
        where:{
          name:{
            contains:query,
          }
        },
        include:{
          Category:true
        }
      })
      res.json(products)
    }
    if(category && Array.isArray(category)){
      const products = await prisma.product.findMany({
        where:{
          category_id:{
            in: category.map((id)=> Number(id))
          }
        },
        include:{
          Category:true
        }
      })
      res.json(products)
    }
    if(price && Array.isArray(price) && price.length === 2) {
      const products = await prisma.product.findMany({
        where:{
          price:{
            gte: price[0],
            lte: price[1]
          }
        },
        include:{
          Category:true
        }
      })
      res.json(products)
    }
  } catch (error) {
    res.json("Server Error")
  }
}
