import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 1000,
  database_urls: process.env.DATABASE_URL,
  database_local_url: process.env.DATABASE_LOCAL_URL,
  user_default_role: process.env.DEFAULT_ROLE,
  bcrypt_salts_round: process.env.BCRYPT_SALT_ROUNDS,
  jwtAccessKey: process.env.JWT_ACCESS_SECRET,
  jwtAccessExpireDate: process.env.JWT_ACCESS_SECRET_EXPIRE_IN,
  jwtRefreshKey: process.env.JWT_REFRESH_SECRET,
  jwtRefreshExpireDate: process.env.JWT_REFRESH_SECRET_EXPIRE_IN,
};
