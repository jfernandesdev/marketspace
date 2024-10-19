import { Request, Response } from "express";

import { prisma } from "../database";

export class UserProductsController {
  async index(request: Request, response: Response) {
    const userId = request.user.id

    const products = await prisma.products.findMany({
      where: {
        user_id: userId,
      },
      include: {
        product_images: {
          select: {
            path: true,
            id: true
          }
        },
        payment_methods: {
          select: {
            key: true,
            name: true
          }
        }
      }
    })

    return response.json(products);
  }

  async activeQuantity(request: Request, response: Response) {
    const userId = request.user.id;

    const activeProductsCount = await prisma.products.count({
      where: {
        user_id: userId,
        is_active: true
      }
    });

    return response.json({ activeProductsCount });
  }
}