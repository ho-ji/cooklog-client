export const emailIdValidator = (emailId: string): boolean => /^[a-zA-Z0-9]+([._%+-][a-zA-Z0-9]+)*$/.test(emailId)

export const domainValidator = (domain: string): boolean => /^(?!-)[a-zA-Z0-9-]+(?<!-)\.[a-zA-Z]{2,}$/.test(domain)

export const emailValidator = (email: string): boolean => /^[a-zA-Z0-9]+([._%+-][a-zA-Z0-9]+)*@(?!-)[a-zA-Z0-9-]+(?<!-)\.[a-zA-Z]{2,}$/.test(email)

export const passwordValidator = (password: string): boolean => /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#.~_-])[A-Za-z\d@$!%*?&#.~_-]{8,16}$/.test(password)

export const nicknameValidator = (nickname: string): boolean => /^[a-zA-Z0-9가-힣]{2,20}$/.test(nickname)

export const verificationCodeValidator = (code: string): boolean => /^[0-9]{6}$/.test(code)
