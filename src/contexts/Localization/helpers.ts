import { EN } from 'config/localization/languages'

const MAIN_DOMAIN = process.env.REACT_APP_MAIN_DOMAIN
const publicUrl = `https://${MAIN_DOMAIN}`
export const LS_KEY = 'sugarswap_language'

export const fetchLocale = async (locale) => {
  const response = await fetch(`${publicUrl}/locales/${locale}.json`)
  const data = await response.json()
  return data
}

export const getLanguageCodeFromLS = () => {
  try {
    const codeFromStorage = localStorage.getItem(LS_KEY)

    return codeFromStorage || EN.locale
  } catch {
    return EN.locale
  }
}
