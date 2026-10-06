import { compare } from 'bcryptjs'
import { describe, expect, it, vi } from 'vitest'
import { AuthenticateUserUseCase } from './authenticate.js'

vi.mock('bcryptjs', () => ({
  compare: vi.fn(),
}))

describe('AuthenticateUser Use Case', () => {
  it('deve retornar um token quando o email e a senha estiverem corretos', async () => {
    const usersRepositoryMock = {
      findByEmail: vi.fn().mockResolvedValue({
        id: 'user-id-1',
        email: 'jonas@exemplo.com',
        passwordHash: 'hashed-pwd',
      }),
    }

    vi.mocked(compare).mockResolvedValue(true as never)

    const authenticateUser = new AuthenticateUserUseCase(
      usersRepositoryMock as any,
    )

    const response = await authenticateUser.execute({
      email: 'jonas@exemplo.com',
      password: 'pwd',
    })

    expect(response.user).toHaveProperty('id')
    expect(response.user.email).toBe('jonas@exemplo.com')
    expect(usersRepositoryMock.findByEmail).toHaveBeenCalledWith(
      'jonas@exemplo.com',
    )
    expect(compare).toHaveBeenCalledWith('pwd', 'hashed-pwd')
  })
})
