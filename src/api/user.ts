import {UserInfo} from '@/components/signup/SignUpForm'
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

export const verifyNicknameAPI = async (nickname: string) => {
  try {
    const res = await instance.get(`/api/user/verify-nickname/${nickname}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const signUpAPI = async (userInfo: UserInfo) => {
  try {
    const res = await instance.post('/api/signup', {
      userInfo,
    })
    return res.data
  } catch (error) {
    throw error
  }
}
