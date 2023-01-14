import { StringField } from './string-field'

it('should create new text field', () => {
  const field = StringField.create({
    name: 'hello',
    type: 'string',
    key: 'abc',
  })

  expect(field.unpack()).toMatchObject({
    key: 'abc',
    name: 'hello',
    valueConstrains: {
      required: undefined,
    },
  })

  expect(field.type).toBe('string')
})

it('should throw error if name is invalid', () => {
  const createField = () =>
    StringField.create({
      name: 'h',
      type: 'string',
      key: 'abc',
    })

  expect(createField).toThrowErrorMatchingInlineSnapshot(`
    "[
      {
        \\"code\\": \\"too_small\\",
        \\"minimum\\": 2,
        \\"type\\": \\"string\\",
        \\"inclusive\\": true,
        \\"exact\\": false,
        \\"message\\": \\"String must contain at least 2 character(s)\\",
        \\"path\\": []
      }
    ]"
  `)
})
