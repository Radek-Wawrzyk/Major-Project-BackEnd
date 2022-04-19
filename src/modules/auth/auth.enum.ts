const enum AUTH_EMAIL_CONFIG {
  SUBJECT = 'FindYourFlat: Forget password',
  FROM = 'radekwawrzyk@gmail.com',
  TEXT = 'Hey, you have got a new reset password link',
}

const enum AUTH_HTTP_RESPONSES {
  UPDATED_PASSOWRD = 'Your password has been changed!',
  NOT_UPDATED_PASSOWRD = 'Your password has not been changed, there was an error',
}

export { AUTH_EMAIL_CONFIG, AUTH_HTTP_RESPONSES };
