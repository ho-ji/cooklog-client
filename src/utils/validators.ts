const isValidEmailId = (emailId: string): boolean => /^[a-zA-Z0-9._%+-]+$/.test(emailId)

const isValidDomain = (domain: string): boolean => /^[a-zA-Z0-9.-]+\.[a-zA-z]{2,}$/.test(domain)

export const emailValidator = (emailId: string, domain: string): boolean => isValidEmailId(emailId) && isValidDomain(domain)

export const passwordValidator = (password: string): boolean => /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#.~_-])[A-Za-z\d@$!%*?&#.~_-]{8,16}$/.test(password)

export const nicknameValidator = (nickname: string): boolean => /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,20}$/.test(nickname)

export const verificationCodeValidator = (code: string): boolean => /^[0-9]{6}$/.test(code)
