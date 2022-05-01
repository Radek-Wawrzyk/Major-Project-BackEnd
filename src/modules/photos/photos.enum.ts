const enum PHOTOS_HTTP_RESPONSES {
  NOT_FOUND = 'Photo not found',
  BAD_FILE = 'Invalid file provided',
  NO_PHOTO_ID = 'No photo_id field provided',
  NO_OFFER_ID = 'No offer_id field provided',
  OVER_LIMIT = 'You have reached the photos limit, which is 5',
}

export { PHOTOS_HTTP_RESPONSES };
