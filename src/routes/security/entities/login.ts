import * as yup from 'yup'
export const LoginDataSchema = yup.object({
  username: yup.string().trim().required(),
  password: yup.string().trim().required(),
})

export interface LoginData extends yup.Asserts<typeof LoginDataSchema> {}
