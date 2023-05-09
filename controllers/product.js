const prisma = require("../config/prisma");

exports.getProduct = async (req, res) => {
    const { handler } = req.params;
    const rawhandler = handler.replace(/-/gi, " ");

    const { color } = await prisma.productOption.findFirst({
        select: {
            color: true,
            image: true,
            handler: true
        },
        where: {
            handler
        }
    })

    const colorHandler = rawhandler
        .replace(color.toLowerCase(), "")
        .replace(/\s/gi, "-")

    const result = await prisma.product.findMany({
        include: {
            options: {
                select: {
                    size: true, id: true, color: true, sku: true, price: true, stock: true,
                }
            },
            wishlist: { select: { id: true } }
        },
        where: { handler: { contains: colorHandler } }
    })

    const colors = result.map(item => ({
        label: item.options[0].color, image: item.image, handler: item.handler
    }))
    const product = result.find(item => item.handler === handler)

    res.status(200).json({ ...product, colors })
}

exports.getProducts = async (req, res, next) => {
    const {
        size,
        color,
        search,
        price,
        pageNumber = 1,
        pageSize = 12,
        category,
        subcategory,
    } = req.query;


    const result = await prisma.product.findMany({
        select: {
            id: true,
            image: true,
            name: true,
            price: true,
            discount: true,
            handler: true,
            wishlist: { select: { id: true } }
        },
        where: {
            AND: [{
                category: {
                    name: {
                        equals: category
                    }
                }
            }, {
                subcategory: {
                    name: {
                        equals: subcategory
                    }
                }
            }
                , {
                options: {
                    some: {
                        size: {
                            in: size?.split("+")
                        },
                        color: {
                            in: color?.split("+")
                        }
                    }
                }
            }],
            OR: [
                {
                    name: {
                        contains: search
                    }
                },
                {
                    subcategory: {
                        name: {
                            contains: search
                        }
                    }
                }
            ]
        },
        orderBy: {
            price
        },
        skip: Number((pageNumber - 1) * pageSize),
        take: Number(pageSize),
        distinct: ["sku"]
    })

    res.status(200).send(result)
}

exports.getProductOptions = async (req, res) => {
    const { option } = req.params;
    const { category, subcategory } = req.query;
    const result = await prisma.productOption.findMany({
        select: {
            [option]: true
        },
        where: {
            product: {
                category: {
                    name: category
                },
                subcategory: {
                    name: subcategory
                }
            },
            [option]: {
                not: ""
            }
        },
        distinct: [option]
    })

    res.status(200).send(result)
}

exports.getCategories = async (req, res) => {
    const result = await prisma.category.findMany()
    res.status(200).send(result)
}

exports.getSubcategoriesByCategory = async (req, res) => {
    const { category } = req.params
    const result = await prisma.subcategory.findMany({ where: { category: { name: category } } })
    res.status(200).send(result)
}

exports.getSubcategories = async (req, res) => {
    const result = await prisma.subcategory.findMany()
    res.status(200).send(result)
}

exports.getOptionsByProduct = async (req, res) => {
    const { option, handler } = req.params;
    const rawhandler = handler.replace(/-/gi, " ");
    let color = ""
    if (option === "color")
        color = (await prisma.productOption.findFirst({
            select: {
                color: true,
            },
            where: {
                handler
            }
        })).color

    const colorHandler = rawhandler
        .replace(color.toLowerCase(), "")
        .replace(/\s/gi, "-")

    const result = await prisma.productOption.findMany({
        select: {
            [option]: true,
        },
        where: {
            product: {
                handler: { contains: colorHandler }
            },
            [option]: {
                not: ""
            }
        },
        distinct: [option]
    })

    res.status(200).send(result)
}