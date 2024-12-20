const isValidEmailId = (emailId: string): boolean => /^[a-zA-Z0-9._%+-]+$/.test(emailId)

const isValidDomain = (domain: string): boolean => /^[a-zA-Z0-9.-]+\.[a-zA-z]{2,}$/.test(domain)

export const emailValidator = (emailId: string, domain: string): boolean => isValidEmailId(emailId) && isValidDomain(domain)

export const passwordValidator = (password: string): boolean => /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+==])(?=.*[0-9]).{8,16}$/.test(password)
