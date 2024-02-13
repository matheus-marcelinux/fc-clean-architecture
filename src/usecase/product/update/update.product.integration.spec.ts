import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";

describe("Test update product use case", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true}
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async() => {
        await sequelize.close();
    });

    it("should create a product", async () => {

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        
        await productRepository.create(product);

        const productUpdateUseCase = new UpdateProductUseCase(productRepository);

        const input = {
            id: product.id,
            name: "Product 1 Updated",
            price: 20
        }

        const output = await productUpdateUseCase.execute(input);
        expect(output).toEqual(input);
    })

})