export const VALIDATION_MESSAGES = {
  REQUIRED: 'The {{ fieldName }} is required.',
  MIN_MAX: 'The {{ fieldName }} should be at least {{ min }} characters and {{ max }} max.',
  URL: 'This {{ fieldName }} must be a valid url.',
  INVALID_DATE: 'Enter correct Date',
  NOT_VALID: ' The {{ fieldName }} is not valid',
  INVALID_FILE_FORMAT: 'Invalid file format',
  INVALID_FILE_SIZE: 'Allowed file size - 10 mb',
  REQUIRED_PRICE_TYPE: 'Price of {{ fieldName }} is required',
  MIN_MAX_FOR_DESCRIPTIONS: 'At least {{ min }} character and {{ max }} max.',
  URL_NOT_AVAILABLE: 'This URL is not available. Try a different URL.',
  INCOMPLETE_EMAIL: 'Incomplete email address',
  REQUIRED_SHORT: '{{ fieldName }} is required.',
}
export const PASSWORD_REGEX = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/

export const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const FULLNAME_REGEX = /([a-z]+[,.]? ?|[a-z]+['-]?)+$/

export const URL_WITHOUT_PROTOCOL = /^[\w.-]+(?:\.[\w.-]+)+[\w\-._%~:/?#[\]@!$&'()*+,;=]+$/

export const PHONE_NUMBER =
  /^[\+]?\d{2,}?[(]?\d{2,}[)]?[-\s\.]?\d{2,}?[-\s\.]?\d{2,}[-\s\.]?\d{0,9}$/im

export const validateFullName = (value: string) => {
  return value && FULLNAME_REGEX.test(value)
}

export const validateRemoveSpace = (value: string) => {
  return value && value.trim()
}

export const validatePassword = (value: string) => {
  return value && PASSWORD_REGEX.test(value)
}

export const validateEmail = (value: string) => {
  return value && EMAIL_REGEX.test(value.trim())
}

export const validatePhoneNumber = (value: string) => {
  return value && PHONE_NUMBER.test(value.trim())
}
export const validateStrictUrl = (url: string) => {
  try {
    new URL(url) // eslint-disable-line no-new
  } catch (e) {
    return false
  }
  return true
}

export const validateUrlWithoutProtocol = (url: string) => {
  return Boolean(url && URL_WITHOUT_PROTOCOL.test(url))
}

export const validateUrl = (url = '') => {
  return validateStrictUrl(url) || validateUrlWithoutProtocol(url)
}

export const template = (
  tempalteString: string,
  args = {} as Record<string, string | number>,
  defaultValue = ''
) => {
  let formatedString = tempalteString
  const keys = Object.keys(args)

  keys.forEach((key) => {
    // Note that tempale key is spaced from prefix and postfix
    const templateKey = new RegExp(`{{ ${key} }}`, 'g')
    const value = args[key] || defaultValue

    formatedString = formatedString.replace(templateKey, String(value))
  })

  const unreplacedValueRegex = /{{\s(?!}})[^}]*\s}}/g
  formatedString = formatedString.replace(unreplacedValueRegex, '')

  return formatedString
}

export const validateImageUrl = (value: string) => {
  return Boolean(value && /(https?:\/\/.*\.(?:png|jpg|jpeg))/i.test(value))
}
