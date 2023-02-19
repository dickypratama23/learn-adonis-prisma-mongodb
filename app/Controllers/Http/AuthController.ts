import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { prisma } from '@ioc:Adonis/Addons/Prisma'
import Hash from '@ioc:Adonis/Core/Hash'

export default class AuthController {
  public async register({ request, auth }: HttpContextContract) {
    const user = await prisma.user.create({
      data: {
        name: request.input('name'),
        email: request.input('email'),
        password: await Hash.make(request.input('password')),
      },
    })

    const token = await auth.login(user)

    return token
  }

  public async login({ request, response, auth }: HttpContextContract) {
    try {
      const token = await auth.attempt(request.input('email'), request.input('password'))
      return token
    } catch (e) {
      return response.unauthorized('Invalid credentials')
    }
  }
}
