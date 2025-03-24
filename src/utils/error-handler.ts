import { toast } from '@/hooks/use-toast';

// Error severities
export type ErrorSeverity = 'info' | 'warning' | 'error' | 'critical';

// Error metadata for tracking
export interface ErrorMetadata {
  userId?: string;
  component?: string;
  action?: string;
  source?: string;
  context?: Record<string, unknown>;
  // Allow additional properties
  [key: string]: unknown;
}

// Base error structure
export interface AppError {
  code: string;
  message: string;
  severity: ErrorSeverity;
  metadata?: ErrorMetadata;
  originalError?: Error | unknown;
}

// Error codes for specific situations
export enum ErrorCode {
  // Authentication errors
  AUTH_FAILED = 'auth/failed',
  AUTH_EXPIRED = 'auth/expired',
  AUTH_REQUIRED = 'auth/required',
  
  // API errors
  API_NETWORK = 'api/network',
  API_SERVER = 'api/server',
  API_TIMEOUT = 'api/timeout',
  API_RATE_LIMIT = 'api/rate-limit',
  
  // Data errors
  DATA_INVALID = 'data/invalid',
  DATA_NOT_FOUND = 'data/not-found',
  DATA_PERMISSION = 'data/permission',
  
  // Storage errors
  STORAGE_QUOTA = 'storage/quota',
  STORAGE_UPLOAD = 'storage/upload',
  STORAGE_DOWNLOAD = 'storage/download',
  
  // Layout errors
  LAYOUT_SAVE = 'layout/save',
  LAYOUT_LOAD = 'layout/load',
  LAYOUT_DELETE = 'layout/delete',
  
  // Audio processing errors
  AUDIO_FORMAT = 'audio/format',
  AUDIO_DECODE = 'audio/decode',
  AUDIO_PLAYBACK = 'audio/playback',
  
  // Generic errors
  UNKNOWN = 'unknown',
  VALIDATION = 'validation',
  NOT_IMPLEMENTED = 'not-implemented',
  FEATURE_RESTRICTED = 'feature/restricted'
}

// Error messages for common error codes
const ERROR_MESSAGES: Record<ErrorCode, string> = {
  [ErrorCode.AUTH_FAILED]: 'Authentication failed. Please check your credentials and try again.',
  [ErrorCode.AUTH_EXPIRED]: 'Your session has expired. Please sign in again.',
  [ErrorCode.AUTH_REQUIRED]: 'Authentication is required for this action.',
  
  [ErrorCode.API_NETWORK]: 'Network error. Please check your connection and try again.',
  [ErrorCode.API_SERVER]: 'Server error. Our team has been notified.',
  [ErrorCode.API_TIMEOUT]: 'Request timed out. Please try again.',
  [ErrorCode.API_RATE_LIMIT]: 'Rate limit exceeded. Please try again later.',
  
  [ErrorCode.DATA_INVALID]: 'Invalid data provided.',
  [ErrorCode.DATA_NOT_FOUND]: 'Requested data not found.',
  [ErrorCode.DATA_PERMISSION]: 'You do not have permission to access this data.',
  
  [ErrorCode.STORAGE_QUOTA]: 'Storage quota exceeded. Please upgrade your plan.',
  [ErrorCode.STORAGE_UPLOAD]: 'Failed to upload file. Please try again.',
  [ErrorCode.STORAGE_DOWNLOAD]: 'Failed to download file. Please try again.',
  
  [ErrorCode.LAYOUT_SAVE]: 'Failed to save dashboard layout.',
  [ErrorCode.LAYOUT_LOAD]: 'Failed to load dashboard layout.',
  [ErrorCode.LAYOUT_DELETE]: 'Failed to delete dashboard layout.',
  
  [ErrorCode.AUDIO_FORMAT]: 'Unsupported audio format.',
  [ErrorCode.AUDIO_DECODE]: 'Failed to decode audio file.',
  [ErrorCode.AUDIO_PLAYBACK]: 'Failed to play audio.',
  
  [ErrorCode.UNKNOWN]: 'An unexpected error occurred.',
  [ErrorCode.VALIDATION]: 'Validation error. Please check your input.',
  [ErrorCode.NOT_IMPLEMENTED]: 'This feature is not yet implemented.',
  [ErrorCode.FEATURE_RESTRICTED]: 'This feature is not available on your current plan.'
};

// Default error severities
const DEFAULT_SEVERITIES: Record<ErrorCode, ErrorSeverity> = {
  // Auth errors are generally warnings
  [ErrorCode.AUTH_FAILED]: 'warning',
  [ErrorCode.AUTH_EXPIRED]: 'warning',
  [ErrorCode.AUTH_REQUIRED]: 'warning',
  
  // API errors vary based on type
  [ErrorCode.API_NETWORK]: 'warning',
  [ErrorCode.API_SERVER]: 'error',
  [ErrorCode.API_TIMEOUT]: 'warning',
  [ErrorCode.API_RATE_LIMIT]: 'warning',
  
  // Data errors are usually warnings
  [ErrorCode.DATA_INVALID]: 'warning',
  [ErrorCode.DATA_NOT_FOUND]: 'warning',
  [ErrorCode.DATA_PERMISSION]: 'warning',
  
  // Storage errors are often warnings
  [ErrorCode.STORAGE_QUOTA]: 'warning',
  [ErrorCode.STORAGE_UPLOAD]: 'warning',
  [ErrorCode.STORAGE_DOWNLOAD]: 'warning',
  
  // Layout errors affect user experience
  [ErrorCode.LAYOUT_SAVE]: 'warning',
  [ErrorCode.LAYOUT_LOAD]: 'warning',
  [ErrorCode.LAYOUT_DELETE]: 'warning',
  
  // Audio errors affect core functionality
  [ErrorCode.AUDIO_FORMAT]: 'warning',
  [ErrorCode.AUDIO_DECODE]: 'error',
  [ErrorCode.AUDIO_PLAYBACK]: 'warning',
  
  // Generic errors
  [ErrorCode.UNKNOWN]: 'error',
  [ErrorCode.VALIDATION]: 'warning',
  [ErrorCode.NOT_IMPLEMENTED]: 'info',
  [ErrorCode.FEATURE_RESTRICTED]: 'info'
};

/**
 * Creates a standardized error object
 */
export function createAppError(
  code: ErrorCode,
  overrideMessage?: string,
  metadata?: ErrorMetadata,
  originalError?: Error | unknown,
  severity?: ErrorSeverity
): AppError {
  return {
    code,
    message: overrideMessage || ERROR_MESSAGES[code],
    severity: severity || DEFAULT_SEVERITIES[code],
    metadata,
    originalError
  };
}

/**
 * Handles an error by logging it and optionally displaying a toast notification
 */
export function handleError(
  error: AppError | Error | unknown,
  shouldToast = true,
  metadata?: ErrorMetadata
): AppError {
  let appError: AppError;
  
  // Convert to AppError if not already
  if (error && typeof error === 'object' && 'code' in error && typeof (error as Record<string, unknown>).code === 'string') {
    appError = error as AppError;
    // Add additional metadata if provided
    if (metadata) {
      appError.metadata = { ...appError.metadata, ...metadata };
    }
  } else if (error instanceof Error) {
    appError = createAppError(
      ErrorCode.UNKNOWN,
      error.message,
      metadata,
      error
    );
  } else {
    appError = createAppError(
      ErrorCode.UNKNOWN,
      typeof error === 'string' ? error : 'An unknown error occurred',
      metadata,
      error
    );
  }
  
  // Log the error
  if (appError.severity === 'critical' || appError.severity === 'error') {
    console.error('Application error:', appError);
  } else {
    console.warn('Application warning:', appError);
  }
  
  // Send to error tracking service
  // TODO: Implement actual error tracking integration
  //trackError(appError);
  
  // Show toast notification if requested
  if (shouldToast) {
    const variant = appError.severity === 'critical' || appError.severity === 'error' 
      ? 'destructive' 
      : appError.severity === 'warning' 
        ? 'default' 
        : 'default';
    
    toast({
      title: getErrorTitle(appError),
      description: appError.message,
      variant
    });
  }
  
  return appError;
}

/**
 * Get a user-friendly title for an error code
 */
function getErrorTitle(error: AppError): string {
  const codePrefix = error.code.split('/')[0];
  
  switch (codePrefix) {
    case 'auth':
      return 'Authentication Error';
    case 'api':
      return 'Connection Error';
    case 'data':
      return 'Data Error';
    case 'storage':
      return 'Storage Error';
    case 'layout':
      return 'Layout Error';
    case 'audio':
      return 'Audio Error';
    case 'feature':
      return 'Feature Restricted';
    case 'validation':
      return 'Validation Error';
    default:
      return 'Error';
  }
}

/**
 * Try to perform an operation with standardized error handling
 */
export async function tryOperation<T>(
  operation: () => Promise<T>,
  errorCode: ErrorCode,
  errorContext?: {
    message?: string;
    metadata?: ErrorMetadata;
    shouldToast?: boolean;
  }
): Promise<T> {
  try {
    return await operation();
  } catch (error: unknown) {
    const appError = handleError(
      createAppError(
        errorCode,
        errorContext?.message,
        errorContext?.metadata,
        error
      ),
      errorContext?.shouldToast ?? true
    );
    
    throw appError;
  }
} 