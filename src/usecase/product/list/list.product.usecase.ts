import Product from "../../../domain/product/entity/product";
import ProductInterface from "../../../domain/product/entity/product.interface";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputListProductDto, OutputListProductDto } from "./list.product.dto";

export default class ListProductUseCase {
    private repository : ProductRepositoryInterface;

    constructor(repository : ProductRepositoryInterface) {
        this.repository = repository
    }

    async execute(input : InputListProductDto) : Promise<OutputListProductDto> {
        const products = await this.repository.findAll();
        return OutputMapper.toOutput(products);
    }
}


class OutputMapper {
    static toOutput(product: ProductInterface[]): OutputListProductDto {
        return {
            products: product.map((p) => ({
                id: p.id,
                name: p.name,
                price: p.price
            }))
        }
    } 
}