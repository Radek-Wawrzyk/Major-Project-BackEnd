const enum EMAIL_CONFIG {
  SUBJECT = 'FindYourFlat: New question!',
  FROM = 'radekwawrzyk@gmail.com',
  TEXT = 'Hey, you have got a new question regarding your offer!',
}

const enum QUESTIONS_ERROR_RESPONSES {
  NOT_FOUND = 'The question has been not found',
  FORBIDDEN = 'You have no accesss to this resource',
}

export { EMAIL_CONFIG, QUESTIONS_ERROR_RESPONSES };
