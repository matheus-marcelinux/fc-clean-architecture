import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.use.case";


const product = new Product("123", "Product 1", 10);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
};

describe("Unit test find product use case", () => {


    it("should find a product", async () => {
        const repository = MockRepository();
        const useCase = new FindProductUseCase(repository);
        
        const input = {
            id: "123"
        };
        
        const output = {
            id: "123",
            name: "Product 1",
            price: 10,
        };
        
        const result = await useCase.execute(input);
        expect(result).toEqual(output);

    });

    it("should not find a product", async () => {
        const repository = MockRepository();
        repository.find.mockImplementation(() => {
            throw new Error("Product not found");
        })
        const usecase = new FindProductUseCase(repository);
       
        const input = {
            id: "123",
        }

        expect(() => {
            return usecase.execute(input);
        }).rejects.toThrow("Product not found")
    });


})