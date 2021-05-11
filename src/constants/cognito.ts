// #region aws
export const AWS_REGION_CONF: string = 'AWS_REGION';
export const AWS_ACCESS_KEY_ID_CONF: string = 'AWS_ACCESS_KEY_ID';
export const AWS_SECRET_ACCESS_KEY_CONF: string = 'AWS_SECRET_ACCESS_KEY';
export const AWS_COGNITO_USER_POOL_ID_CONF: string = 'AWS_COGNITO_USER_POOL_ID';
export const AWS_COGNITO_CLIENT_ID_CONF: string = 'AWS_COGNITO_CLIENT_ID';
export const AWS_COGNITO_CLIENT_SECRET_CONF: string = 'AWS_COGNITO_CLIENT_SECRET';
export const AWS_COGNITO_IDENTITY_POOL_ID_CONF: string = 'AWS_COGNITO_IDENTITY_POOL_ID';
export const AWS_S3_BUCKET_CONF: string = 'AWS_S3_BUCKET';
// #endregion config

// #region cognito provider
export const ICOGNITO_SERVICE_PROVIDER: string = 'ICognitoService';
// #endregion cognito provider

// #region cognito error
export const SAME_PASSWORD: string = 'Password is same as previous password';
// #endregion cognito error

// #region fields
export const USERNAME_FIELD: string = 'username';
export const USER_ID_FIELD: string = 'user_id';
export const FIRST_NAME_FIELD: string = 'first_name';
export const LAST_NAME_FIELD: string = 'last_name';
export const PHONE_NO_FIELD: string = 'phone_no';
export const ACTIVE_FIELD: string = 'active';
export const TOKEN_TYPE_FIELD: string = 'token_type';
export const ACCESS_TOKEN_FIELD: string = 'access_token';
export const REFRESH_TOKEN_FIELD: string = 'refresh_token';
export const EXPIRES_IN_FIELD: string = 'expires_in';
export const ID_TOKEN_FIELD: string = 'id_token';
export const OLD_PASSWORD_FIELD: string = 'old_password';
export const NEW_PASSWORD_FIELD: string = 'new_password';
export const TOKEN_FIELD: string = 'token';
// #endregion fields

// #region cognito enum

export enum RoleTypes {
  ADMIN = 'admin',
  USER = 'user',
}

export enum PermissionTypes {
  USERS_READ = 'users:read',
  PERMISSIONS_WRITE = 'permissions:write',
}

// #endregion cognito enum

// #region unauthorized
export const INVALID_PERMISSION: string = 'Invalid permissions';
export const INVALID_USER_CREDENTIALS: string = 'Invalid user credentials';
export const UNAUTHORIZED_TO_PERFORM_OPERATION: string = 'You are not authorized to perform the operation';
// #endregion unauthorized

// #region decorator
export const PERMISSIONS_KEY: string = 'permissions';
export const ROLES_KEY: string = 'roles';
// #endregion decorator
