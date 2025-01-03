import {instance} from '.'

export const verifyEmailAPI = async (email: string) => {
  try {
    const res = await instance.get(`/api/user/verify-email/${email}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const sendVerificationCodeAPI = async (email: string) => {
  try {
    const res = await instance.post(`/api/user/send-verification-code/${email}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const checkVerificationCodeAPI = async (email: string, code: string) => {
  try {
    const res = await instance.post(`/api/user/check-verification-code`, {
      email,
      code,
    })
    return res.data
  } catch (error) {
    throw error
  }
}
