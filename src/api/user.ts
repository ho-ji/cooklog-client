import {instance} from '.'

export const verifyEmailAPI = async (email: string) => {
  try {
    const result = await instance.get(`/api/user/verify-email/${email}`)
    if (result.data.success) return result.data.data
  } catch (error) {
    throw error
  }
}
