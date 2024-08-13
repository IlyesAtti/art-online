import { diskStorage } from 'multer';
import { extname } from 'path';

export const storage = diskStorage({
  destination: './uploads/images',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
  },
});