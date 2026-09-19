export class UserNotFoundForPasswordResetError extends Error {
  constructor() {
    super(
      'Se o usuário existir, você receberá um e-mail com instruções para redefinir a senha.',
    )
  }
}
