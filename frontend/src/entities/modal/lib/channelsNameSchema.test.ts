import { channelsNameSchema } from './channelsNameSchema'

describe('channelsNameSchema validation', () => {
  it('validates valid channel name', async () => {
    const schema = channelsNameSchema(['general', 'random'])
    const validData = { channelName: 'newchannel' }
    await expect(schema.validate(validData)).resolves.toBeTruthy()
  })

  it('requires channel name', async () => {
    const schema = channelsNameSchema(['general', 'random'])
    const invalidData = { channelName: '' }
    await expect(schema.validate(invalidData)).rejects.toThrow('От 3 до 20 символов')
  })

  it('validates min length (3 chars)', async () => {
    const schema = channelsNameSchema(['general', 'random'])
    const invalidData = { channelName: 'ab' }
    await expect(schema.validate(invalidData)).rejects.toThrow('От 3 до 20 символов')
  })

  it('validates max length (20 chars)', async () => {
    const schema = channelsNameSchema(['general', 'random'])
    const invalidData = { channelName: 'a'.repeat(21) }
    await expect(schema.validate(invalidData)).rejects.toThrow('От 3 до 20 символов')
  })

  it('requires unique channel name', async () => {
    const schema = channelsNameSchema(['general', 'random'])
    const invalidData = { channelName: 'general' }
    await expect(schema.validate(invalidData)).rejects.toThrow('Должно быть уникальным')
  })
})
