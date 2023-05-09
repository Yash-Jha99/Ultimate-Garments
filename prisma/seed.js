const { PrismaClient } = require('@prisma/client')
const productsData = require("./products.json")
const productOptionsData = require("./product-options.json")
const categoryData = require("./category.json")
const subcategoryData = require("./subcategory.json")
const prisma = new PrismaClient()

async function main() {
    const createCategories = await prisma.category.createMany({
        data: categoryData,
        skipDuplicates: true
    })
    console.log(createCategories)
    const createSubcategories = await prisma.subcategory.createMany({
        data: subcategoryData,
        skipDuplicates: true
    })
    console.log(createSubcategories)
    const createProducts = await prisma.product.createMany({
        data: productsData,
        skipDuplicates: true
    })
    console.log(createProducts)

    const createOptions = await prisma.productOption.createMany({
        data: productOptionsData,
        skipDuplicates: true
    })

    console.log(createOptions)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })