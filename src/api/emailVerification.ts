import {instance} from '.'

export const verifyEmailAPI = async (email: string) => {
  try {
    const res = await instance.get(`/api/email-verification/verify/${email}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const sendVerificationCodeAPI = async (email: string) => {
  try {
    const res = await instance.post(`/api/email-verification/send/${email}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const checkVerificationCodeAPI = async (email: string, code: string) => {
  try {
    const res = await instance.post(`/api/email-verification/check`, {
      email,
      code,
    })
    return res.data
  } catch (error) {
    throw error
  }
}
