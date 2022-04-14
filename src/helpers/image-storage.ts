import { diskStorage } from 'multer';
import { uuid } from '../helpers/index';
import path = require('path');
import * as fs from 'fs';
import { Request } from 'express';

interface PhotoRequest extends Request {
  fileValidationError?: string;
}

type validFileExtension = 'png' | 'jpg' | 'jpeg';
type validMimeType = 'image/png' | 'image/jpg' | 'image/jpeg';

const validFileExtensions: validFileExtension[] = ['png', 'jpg', 'jpeg'];
const validMimeTypes: validMimeType[] = [
  'image/png',
  'image/jpg',
  'image/jpeg',
];

const saveImageToStorage = (folderName: string) => {
  return {
    storage: diskStorage({
      destination: `./uploads/${folderName}`,
      filename: (_, file, callback) => {
        // Regex for deleteing white spaces from the name of the file
        const filename = `${path
          .parse(file.originalname)
          .name.replace(/\s/g, '')}-${uuid()}`;
        const extension: string = path.parse(file.originalname).ext;

        callback(null, `${filename}${extension}`);
      },
    }),
    fileFilter: (request, file, callback) => {
      const allowedMimeTypes: validMimeType[] = validMimeTypes;

      if (!allowedMimeTypes.includes(file.mimetype)) {
        request.fileValidationError = 'Only image files are allowed';
        callback(null, false);
      } else callback(null, true);
    },
    limits: {
      fileSize: 2097152, // 2MB
    },
  };
};

// const saveImageToStorage = {
//   storage: diskStorage({
//     destination: './uploads/photos',
//     filename: (_, file, callback) => {
//       // Regex for deleteing white spaces from the name of the file
//       const filename = `${path
//         .parse(file.originalname)
//         .name.replace(/\s/g, '')}-${uuid()}`;
//       const extension: string = path.parse(file.originalname).ext;

//       callback(null, `${filename}${extension}`);
//     },
//   }),
//   fileFilter: (request, file, callback) => {
//     const allowedMimeTypes: validMimeType[] = validMimeTypes;

//     if (!allowedMimeTypes.includes(file.mimetype)) {
//       request.fileValidationError = 'Only image files are allowed';
//       callback(null, false);
//     } else callback(null, true);
//   },
//   limits: {
//     fileSize: 2097152, // 2MB
//   },
// };

const removeFile = (fullFilePath: string): void => {
  try {
    fs.unlinkSync(fullFilePath);
  } catch (err) {
    throw new Error(err);
  }
};

export { saveImageToStorage, removeFile, PhotoRequest };
