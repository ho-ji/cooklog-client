import {instance} from '.'

export const verifyEmailAPI = async (email: string) => {
  try {
    const result = await instance.get(`/api/user/verify-email/${email}`)
    return result.data
  } catch (error) {
    throw error
  }
}
