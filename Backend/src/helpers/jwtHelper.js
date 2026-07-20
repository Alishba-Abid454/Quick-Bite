/**
 * JWT Helper
 * Handles JWT token creation, verification, and decoding
 */

const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRE } = require('../config/env');

/**
 * Sign a new JWT token
 * @param {object} payload - Data to encode in token
 * @param {string} expiresIn - Token expiration time (default: from env)
 * @returns {string} - JWT token
 */

//Create JWT token
const signToken = (payload, expiresIn = JWT_EXPIRE) => {
  try {
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
  } catch (error) {
    throw new Error(`Token signing failed: ${error.message}`);
  }
};

/**
 * Verify a JWT token
 * @param {string} token - JWT token to verify
 * @returns {object|null} - Decoded payload if valid, null if invalid
 */
const verifyToken = (token) => {
  try {
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    // Return null for invalid token (don't throw)
    return null;
  }
};

/**
 * Decode a JWT token without verification
 * @param {string} token - JWT token to decode
 * @returns {object|null} - Decoded payload
 */
const decodeToken = (token) => {
  try {
    const decoded = jwt.decode(token);// read JWT token and extract data form it 
    return decoded;
  } catch (error) {
    return null;
  }
};

/**
 * Extract token from Authorization header
 * @param {string} authHeader - Authorization header value
 * @returns {string|null} - Token or null
 */

// token: Bearer yadk32okr2342442...
const extractTokenFromHeader = (authHeader) => {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.split(' ')[1];
};

/**
 * Check if token is expired
 * @param {object} decoded - Decoded token payload
 * @returns {boolean} - True if expired
 */
const isTokenExpired = (decoded) => {
  if (!decoded || !decoded.exp) {
    return true;
  }
  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp < currentTime;
};

/**
 * Get token expiration time in milliseconds
 * @param {string} token - JWT token
 * @returns {number|null} - Expiration timestamp in ms
 */
const getTokenExpiration = (token) => {
  try {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) {
      return null;
    }
    return decoded.exp * 1000; // Convert to milliseconds
  } catch (error) {
    return null;
  }
};

module.exports = {
  signToken,
  verifyToken,
  decodeToken,
  extractTokenFromHeader,
  isTokenExpired,
  getTokenExpiration,
};