/**
 * dateHelper.js - Date Formatting
 * Date formatting, parsing, and manipulation utilities
 */

// Date Formatting

/**
 * Format date to readable string
 * @param {Date|string} date - Date object or string
 * @param {string} format - Format (default: 'MMM DD, YYYY')
 * @returns {string} - Formatted date
 */
export const formatDate = (date, format = 'MMM DD, YYYY') => {
  if (!date) return '';
  
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const monthShort = months[d.getMonth()];
  const monthLong = getMonthFull(d.getMonth());
  const day = String(d.getDate()).padStart(2, '0');
  const dayShort = days[d.getDay()];
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  const ampm = d.getHours() >= 12 ? 'PM' : 'AM';
  const hours12 = String(d.getHours() % 12 || 12).padStart(2, '0');
  
  const replacements = {
    'YYYY': year,
    'YY': String(year).slice(-2),
    'MM': month,
    'MMM': monthShort,
    'MMMM': monthLong,
    'DD': day,
    'ddd': dayShort,
    'HH': hours,
    'mm': minutes,
    'ss': seconds,
    'hh': hours12,
    'A': ampm,
  };
  
  let result = format;
  for (const [key, value] of Object.entries(replacements)) {
    result = result.replace(key, value);
  }
  
  return result;
};

/**
 * Get full month name
 * @param {number} monthIndex - Month index (0-11)
 * @returns {string} - Full month name
 */
export const getMonthFull = (monthIndex) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[monthIndex] || '';
};

/**
 * Format time
 * @param {Date|string} date - Date object or string
 * @param {boolean} includeSeconds - Include seconds (default: false)
 * @returns {string} - Formatted time (e.g., "2:30 PM")
 */
export const formatTime = (date, includeSeconds = false) => {
  if (!date) return '';
  
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  
  let hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  
  let timeStr = `${hours}:${minutes}`;
  if (includeSeconds) {
    const seconds = String(d.getSeconds()).padStart(2, '0');
    timeStr += `:${seconds}`;
  }
  timeStr += ` ${ampm}`;
  
  return timeStr;
};

/**
 * Get relative time (e.g., "2 hours ago")
 * @param {Date|string} date - Date object or string
 * @returns {string} - Relative time string
 */
export const getTimeAgo = (date) => {
  if (!date) return '';
  
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffWeek = Math.floor(diffDay / 7);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);
  
  if (diffSec < 60) {
    return 'Just now';
  } else if (diffMin < 60) {
    return `${diffMin} min ago`;
  } else if (diffHour < 24) {
    return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
  } else if (diffDay < 7) {
    return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
  } else if (diffWeek < 4) {
    return `${diffWeek} week${diffWeek > 1 ? 's' : ''} ago`;
  } else if (diffMonth < 12) {
    return `${diffMonth} month${diffMonth > 1 ? 's' : ''} ago`;
  } else {
    return `${diffYear} year${diffYear > 1 ? 's' : ''} ago`;
  }
};

// Date Comparisons

/**
 * Check if date is today
 * @param {Date|string} date - Date to check
 * @returns {boolean} - True if today
 */
export const isToday = (date) => {
  if (!date) return false;
  const d = new Date(date);
  if (isNaN(d.getTime())) return false;
  
  const today = new Date();
  return d.getFullYear() === today.getFullYear() &&
         d.getMonth() === today.getMonth() &&
         d.getDate() === today.getDate();
};

/**
 * Check if date is in the past
 * @param {Date|string} date - Date to check
 * @returns {boolean} - True if in the past
 */
export const isPast = (date) => {
  if (!date) return false;
  const d = new Date(date);
  if (isNaN(d.getTime())) return false;
  return d.getTime() < Date.now();
};

/**
 * Check if date is in the future
 * @param {Date|string} date - Date to check
 * @returns {boolean} - True if in the future
 */
export const isFuture = (date) => {
  if (!date) return false;
  const d = new Date(date);
  if (isNaN(d.getTime())) return false;
  return d.getTime() > Date.now();
};

/**
 * Get days between two dates
 * @param {Date|string} date1 - First date
 * @param {Date|string} date2 - Second date (default: now)
 * @returns {number} - Number of days
 */
export const getDaysBetween = (date1, date2 = new Date()) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return 0;
  
  const diffMs = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
};

// Date Manipulation

/**
 * Add days to a date
 * @param {Date|string} date - Date to add to
 * @param {number} days - Number of days to add
 * @returns {Date} - New date
 */
export const addDays = (date, days) => {
  const d = new Date(date);
  if (isNaN(d.getTime())) return new Date();
  d.setDate(d.getDate() + days);
  return d;
};

/**
 * Add hours to a date
 * @param {Date|string} date - Date to add to
 * @param {number} hours - Number of hours to add
 * @returns {Date} - New date
 */
export const addHours = (date, hours) => {
  const d = new Date(date);
  if (isNaN(d.getTime())) return new Date();
  d.setHours(d.getHours() + hours);
  return d;
};

/**
 * Get start of day
 * @param {Date|string} date - Date
 * @returns {Date} - Start of day (00:00:00)
 */
export const startOfDay = (date) => {
  const d = new Date(date);
  if (isNaN(d.getTime())) return new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

/**
 * Get end of day
 * @param {Date|string} date - Date
 * @returns {Date} - End of day (23:59:59)
 */
export const endOfDay = (date) => {
  const d = new Date(date);
  if (isNaN(d.getTime())) return new Date();
  d.setHours(23, 59, 59, 999);
  return d;
};

export default {
  formatDate,
  getMonthFull,
  formatTime,
  getTimeAgo,
  isToday,
  isPast,
  isFuture,
  getDaysBetween,
  addDays,
  addHours,
  startOfDay,
  endOfDay,
};