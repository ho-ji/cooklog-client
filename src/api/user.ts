import {UserInfo} from '@/components/signup/SignUpForm'
import {instance} from '.'

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
    const res = await instance.post('/api/user/signup', {
      ...userInfo,
    })
    return res.data
  } catch (error) {
    throw error
  }
}

export const signInAPI = async (email: string, password: string) => {
  try {
    const res = await instance.post('/api/user/signin', {
      email,
      password,
    })
    return res.data
  } catch (error) {
    throw error
  }
}
