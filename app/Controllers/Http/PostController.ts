import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { prisma } from '@ioc:Adonis/Addons/Prisma'

export default class PostController {
  public async index() {
    const posts = await prisma.post.findMany()

    return posts
  }
  public async show({ params }: HttpContextContract) {
    const post = await prisma.post.findUnique({
      where: { id: params.id },
    })

    return post
  }
  public async store({ request }: HttpContextContract) {
    const post = await prisma.post.create({
      data: request.only(['title', 'content']),
    })

    return post
  }
  public async update({ request, params }: HttpContextContract) {
    const post = await prisma.post.update({
      where: { id: params.id },
      data: request.only(['title', 'content']),
    })

    return post
  }
  public async destroy({ params }: HttpContextContract) {
    await prisma.post.delete({
      where: { id: params.id },
    })
  }
}
