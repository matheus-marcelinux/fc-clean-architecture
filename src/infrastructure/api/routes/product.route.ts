import express, {Request, Response} from 'express';
import ListProductUseCase from '../../../usecase/product/list/list.product.usecase';
import ProductRepository from '../../product/repository/sequelize/product.repository';
import CreateProductUseCase from '../../../usecase/product/create/create.product.usecase';

export const productRoute = express.Router();


productRoute.post('/', async (req: Request, res: Response) => {
    const usecase = new CreateProductUseCase(new ProductRepository());
    try {
        const productDto = {
            name: req.body.name,
            price: req.body.price,
            type: req.body.type
        }

        const output = await usecase.execute(productDto);
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});

productRoute.get("/", async (re: Request, res: Response) => {
    const useCase = new ListProductUseCase(new ProductRepository());
    try {
        const output = await useCase.execute({});
        res.send(output);
    } catch(err) {
        res.status(500).send(err);
    }
});