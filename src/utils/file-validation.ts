
/**
 * Utility functions for validating files during upload
 */

/**
 * Validates a file against a list of allowed file types
 * @param file The file to validate
 * @param allowedFileTypes List of MIME types to allow
 * @returns True if valid, false if invalid
 */
export const validateFileType = (
  file: File,
  allowedFileTypes: string[]
): boolean => {
  if (allowedFileTypes.length === 0) return true;
  
  return allowedFileTypes.some(type => {
    // Handle wildcard file types (e.g., "audio/*")
    if (type.endsWith('/*')) {
      const category = type.split('/')[0];
      return file.type.startsWith(`${category}/`);
    }
    return file.type === type;
  });
};

/**
 * Validates a file's size against a maximum allowed size
 * @param file The file to validate
 * @param maxFileSize Maximum file size in bytes
 * @returns True if valid, false if invalid
 */
export const validateFileSize = (
  file: File,
  maxFileSize?: number
): boolean => {
  if (!maxFileSize) return true;
  return file.size <= maxFileSize;
};

/**
 * Formats an error message for invalid file type
 * @param fileName The name of the file
 * @returns Formatted error message
 */
export const getInvalidTypeErrorMessage = (fileName: string): string => {
  return `${fileName} is not an accepted file type.`;
};

/**
 * Formats an error message for file size exceeding maximum
 * @param fileName The name of the file
 * @returns Formatted error message
 */
export const getFileSizeErrorMessage = (fileName: string): string => {
  return `${fileName} exceeds the maximum file size.`;
};
