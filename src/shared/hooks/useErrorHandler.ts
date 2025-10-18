'use client'

import { useCallback } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { 
  handleStrapiErrorSync, 
  createErrorHandler,
  processStrapiErrorSync,
  isAuthenticationError,
  isAuthorizationError,
  isNotFoundError
} from '@/src/shared/utils/errorHandling'
import type { ProcessedError, ErrorHandlerOptions } from '@/src/shared/types/errors'

/**
 * Хук для обработки ошибок Strapi
 */
export const useErrorHandler = () => {
  const router = useRouter()

  /**
   * Обрабатывает ошибку с автоматическими действиями
   */
  const handleError = useCallback((
    error: unknown, 
    options: ErrorHandlerOptions = {}
  ): ProcessedError => {
    const processedError = handleStrapiErrorSync(error, options)

    // Автоматические действия в зависимости от типа ошибки
    switch (processedError.type) {
      case 'authentication':
        // Редирект на страницу входа при ошибке аутентификации
        router.push('/login')
        break
      case 'authorization':
        // Редирект на страницу "недостаточно прав" или главную
        router.push('/unauthorized')
        break
      case 'not_found':
        // Редирект на 404 страницу
        router.push('/not-found')
        break
    }

    return processedError
  }, [router])

  /**
   * Обрабатывает ошибку только с показом уведомления
   */
  const handleErrorWithToast = useCallback((
    error: unknown, 
    fallbackMessage?: string
  ): ProcessedError => {
    return handleError(error, {
      showToast: true,
      logError: true,
      fallbackMessage
    })
  }, [handleError])

  /**
   * Обрабатывает ошибку без показа уведомления
   */
  const handleErrorSilent = useCallback((
    error: unknown, 
    onError?: (error: ProcessedError) => void
  ): ProcessedError => {
    return handleError(error, {
      showToast: false,
      logError: true,
      onError: onError ? () => onError(processStrapiErrorSync(error)) : undefined
    })
  }, [handleError])

  /**
   * Создает обработчик ошибок для React Query мутаций
   */
  const createMutationErrorHandler = useCallback((
    options: ErrorHandlerOptions = {}
  ) => {
    return createErrorHandler({
      showToast: true,
      logError: true,
      ...options
    })
  }, [])

  /**
   * Показывает кастомное уведомление об ошибке
   */
  const showCustomError = useCallback((
    message: string, 
    type: 'error' | 'warning' | 'info' = 'error'
  ) => {
    switch (type) {
      case 'error':
        toast.error(message)
        break
      case 'warning':
        toast.warning(message)
        break
      case 'info':
        toast.info(message)
        break
    }
  }, [])

  /**
   * Проверяет, является ли ошибка определенного типа
   */
  const checkErrorType = useCallback((
    error: ProcessedError, 
    type: ProcessedError['type']
  ): boolean => {
    return error.type === type
  }, [])

  return {
    handleError,
    handleErrorWithToast,
    handleErrorSilent,
    createMutationErrorHandler,
    showCustomError,
    checkErrorType,
    // Утилиты для проверки типов ошибок
    isAuthenticationError,
    isAuthorizationError,
    isNotFoundError,
  }
}

/**
 * Хук для обработки ошибок в формах
 */
export const useFormErrorHandler = () => {
  const { handleErrorWithToast } = useErrorHandler()

  /**
   * Обрабатывает ошибки валидации формы
   */
  const handleFormError = useCallback((
    error: unknown,
    setFieldError?: (field: string, message: string) => void
  ): ProcessedError => {
    const processedError = handleErrorWithToast(error)

    // Если есть детали валидации и функция для установки ошибок полей
    if (processedError.details?.errors && Array.isArray(processedError.details.errors) && setFieldError) {
      processedError.details.errors.forEach((validationError: { field?: string; message?: string }) => {
        if (validationError.field && validationError.message) {
          setFieldError(validationError.field, validationError.message)
        }
      })
    }

    return processedError
  }, [handleErrorWithToast])

  return {
    handleFormError,
  }
}

/**
 * Хук для обработки ошибок в асинхронных операциях
 */
export const useAsyncErrorHandler = () => {
  const { handleErrorWithToast } = useErrorHandler()

  /**
   * Обертка для асинхронных функций с обработкой ошибок
   */
  const withErrorHandling = useCallback(<T extends unknown[], R>(
    asyncFn: (...args: T) => Promise<R>,
    fallbackMessage?: string
  ) => {
    return async (...args: T): Promise<R | null> => {
      try {
        return await asyncFn(...args)
      } catch (error) {
        handleErrorWithToast(error, fallbackMessage)
        return null
      }
    }
  }, [handleErrorWithToast])

  return {
    withErrorHandling,
  }
}
