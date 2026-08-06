export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

export function validateLogin(input: {
  email: string
  password: string
}): string | null {
  if (!input.email.trim() || !input.password) {
    return 'Ingresa correo y contraseña.'
  }
  if (!isValidEmail(input.email)) {
    return 'El correo no es válido.'
  }
  return null
}

export function validateRegister(input: {
  name: string
  email: string
  password: string
}): string | null {
  if (!input.name.trim() || !input.email.trim() || !input.password) {
    return 'Completa todos los campos.'
  }
  if (!isValidEmail(input.email)) {
    return 'El correo no es válido.'
  }
  if (input.password.length < 6) {
    return 'La contraseña debe tener al menos 6 caracteres.'
  }
  return null
}
