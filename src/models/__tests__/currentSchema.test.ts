import CurrentSchema from '../currentSchema'

const MODEL_COUNT = 1

describe('currentSchema', () => {
  it('should have the correct number of models', () => {
    expect(CurrentSchema.schema).toHaveLength(MODEL_COUNT)
  })
})
