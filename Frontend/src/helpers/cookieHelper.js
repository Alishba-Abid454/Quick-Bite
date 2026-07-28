/**
 * cookieHelper.js - Cookie Management
 * Set, get, and delete cookies with expiration
 */

/**
 * Set a cookie
 * @param {string} name - Cookie name
 * @param {string|object} value - Cookie value (object will be stringified)
 * @param {number} days - Days until expiration
 * @param {string} path - Cookie path (default: '/')
 * @param {string} domain - Cookie domain (optional)
 * @param {boolean} secure - Secure flag (default: false)
 * @param {string} sameSite - SameSite attribute (default: 'Lax')
 */
export const setCookie = (
  name,
  value,
  days = 7,
  path = '/',
  domain = '',
  secure = false,
  sameSite = 'Lax'
) => {
  try {
    // Convert object to JSON string
    const stringValue = typeof value === 'object' 
      ? JSON.stringify(value) 
      : String(value);

    // Build expiration date
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    const expiresStr = `expires=${expires.toUTCString()}`;

    // Build cookie string
    let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(stringValue)}`;
    cookieStr += `; ${expiresStr}`;
    cookieStr += `; path=${path}`;
    
    if (domain) {
      cookieStr += `; domain=${domain}`;
    }
    
    if (secure) {
      cookieStr += '; secure';
    }
    
    if (sameSite) {
      cookieStr += `; samesite=${sameSite}`;
    }

    document.cookie = cookieStr;
  } catch (error) {
    console.error('Error setting cookie:', error);
  }
};

/**
 * Get a cookie by name
 * @param {string} name - Cookie name
 * @param {boolean} parseJson - Try to parse as JSON (default: true)
 * @returns {string|object|null} - Cookie value or null if not found
 */
export const getCookie = (name, parseJson = true) => {
  try {
    const nameEncoded = encodeURIComponent(name);
    const cookies = document.cookie.split(';');
    
    for (const cookie of cookies) {
      const trimmed = cookie.trim();
      const [cookieName, cookieValue] = trimmed.split('=');
      
      if (cookieName === nameEncoded) {
        const decodedValue = decodeURIComponent(cookieValue);
        if (parseJson) {
          try {
            return JSON.parse(decodedValue);
          } catch {
            return decodedValue;
          }
        }
        return decodedValue;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error getting cookie:', error);
    return null;
  }
};

/**
 * Delete a cookie
 * @param {string} name - Cookie name
 * @param {string} path - Cookie path (default: '/')
 * @param {string} domain - Cookie domain (optional)
 */
export const deleteCookie = (name, path = '/', domain = '') => {
  try {
    const nameEncoded = encodeURIComponent(name);
    let cookieStr = `${nameEncoded}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}`;
    
    if (domain) {
      cookieStr += `; domain=${domain}`;
    }
    
    document.cookie = cookieStr;
  } catch (error) {
    console.error('Error deleting cookie:', error);
  }
};

/**
 * Check if a cookie exists
 * @param {string} name - Cookie name
 * @returns {boolean} - True if cookie exists
 */
export const hasCookie = (name) => {
  return getCookie(name, false) !== null;
};

/**
 * Get all cookies as an object
 * @param {boolean} parseJson - Try to parse values as JSON (default: true)
 * @returns {object} - All cookies
 */
export const getAllCookies = (parseJson = true) => {
  try {
    const cookies = {};
    const cookieList = document.cookie.split(';');
    
    for (const cookie of cookieList) {
      const trimmed = cookie.trim();
      const [name, value] = trimmed.split('=');
      
      if (name) {
        const decodedName = decodeURIComponent(name);
        const decodedValue = decodeURIComponent(value);
        
        if (parseJson) {
          try {
            cookies[decodedName] = JSON.parse(decodedValue);
          } catch {
            cookies[decodedName] = decodedValue;
          }
        } else {
          cookies[decodedName] = decodedValue;
        }
      }
    }
    
    return cookies;
  } catch (error) {
    console.error('Error getting all cookies:', error);
    return {};
  }
};

// Cookie Keys
export const COOKIE_KEYS = {
  TOKEN: 'food_app_token',
  USER: 'food_app_user',
  THEME: 'food_app_theme',
  LANGUAGE: 'food_app_language',
  CART: 'food_app_cart',
};

export default {
  setCookie,
  getCookie,
  deleteCookie,
  hasCookie,
  getAllCookies,
  COOKIE_KEYS,
};