import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { prisma } from '@ioc:Adonis/Addons/Prisma'

export default class PostController {
  public async index({ response }: HttpContextContract) {
    const posts = await prisma.post.findMany()

    if (!posts?.length) {
      return response.status(400).json({ message: 'No posts found' })
    }

    return response.json(posts)
  }
  public async show({ response, params }: HttpContextContract) {
    const { id } = params
    const post = await prisma.post.findUnique({
      where: { id },
    })

    if (!post) {
      return response.status(400).json({ message: 'Post not found' })
    }

    return response.json(post)
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
