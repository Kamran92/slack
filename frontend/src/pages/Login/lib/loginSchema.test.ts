import { loginSchema } from './loginSchema'

describe('loginSchema validation', () => {
  it('validates valid data', async () => {
    const validData = {
      username: 'testuser',
      password: 'password123',
      confirmpassword: 'password123',
    }
    await expect(loginSchema.validate(validData)).resolves.toBeTruthy()
  })

  it('requires username', async () => {
    const invalidData = {
      username: '',
      password: 'password123',
      confirmpassword: 'password123',
    }
    await expect(loginSchema.validate(invalidData)).rejects.toThrow()
  })

  it('requires password', async () => {
    const invalidData = {
      username: 'testuser',
      password: '',
      confirmpassword: 'password123',
    }
    await expect(loginSchema.validate(invalidData)).rejects.toThrow()
  })

  it('validates username min length (3 chars)', async () => {
    const invalidData = {
      username: 'ab',
      password: 'password123',
      confirmpassword: 'password123',
    }
    await expect(loginSchema.validate(invalidData)).rejects.toThrow('От 3 до 20 символов')
  })

  it('validates username max length (20 chars)', async () => {
    const invalidData = {
      username: 'a'.repeat(21),
      password: 'password123',
      confirmpassword: 'password123',
    }
    await expect(loginSchema.validate(invalidData)).rejects.toThrow('От 3 до 20 символов')
  })

  it('validates password min length (6 chars)', async () => {
    const invalidData = {
      username: 'testuser',
      password: '12345',
      confirmpassword: '12345',
    }
    await expect(loginSchema.validate(invalidData)).rejects.toThrow('Не менее 6 символов')
  })

  it('requires matching passwords', async () => {
    const invalidData = {
      username: 'testuser',
      password: 'password123',
      confirmpassword: 'different',
    }
    await expect(loginSchema.validate(invalidData)).rejects.toThrow('Пароли должны совпадать')
  })
})
