const enum USERS_HTTP_RESPONSES {
  CREATED = 'User created',
  NOT_FOUND = 'User not found',
  EMAIL_CONFLICT = 'This email address is already being used',
  BAD_FILE = 'Invalid file provided (We support PNG/JPG/JPEG)',
}

export { USERS_HTTP_RESPONSES };
