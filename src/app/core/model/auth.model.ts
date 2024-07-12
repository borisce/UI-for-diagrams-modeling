/**
 * @param email - email fo the user
 * @param password - password of the user
 */
export interface LoginRequest {
  readonly email: string;
  readonly password: string;
}

/**
 * @param token - represents Jwt token
 * @param expiresIn - represents expiration timestamp
 */
export interface Jwt {
  readonly token: string;
  readonly expiresIn: string;
}
