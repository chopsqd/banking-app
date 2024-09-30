const ERROR_CODES = {
  EMAIL_NOT_FOUND: "Пользователь с таким email не найден",
  INVALID_PASSWORD: "Неверные данные для входа",

  auth: 'Войдите в систему'
}

export function defineError(code) {
  return ERROR_CODES[code] || "Неизвестная ошибка"
}