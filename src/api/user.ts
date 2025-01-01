import {instance} from '.'

export const verifyEmailAPI = async (email: string) => {
  try {
    const result = await instance.get(`/api/user/verify-email/${email}`)
    return result.data
  } catch (error) {
    throw error
  }
}

export const sendVerificationCodeAPI = async (email: string) => {
  try {
    const result = await instance.post(`/api/user/send-verification-code/${email}`)
    return result.data
  } catch (error) {
    throw error
  }
}
