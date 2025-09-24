export const validation = {
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
  
  required: (value: string | undefined | null): boolean => {
    return value !== undefined && value !== null && value.trim().length > 0;
  },
  
  minLength: (value: string, min: number): boolean => {
    return value.length >= min;
  },
  
  maxLength: (value: string, max: number): boolean => {
    return value.length <= max;
  },
  
  isNumber: (value: string): boolean => {
    return !isNaN(Number(value)) && !isNaN(parseFloat(value));
  },
  
  isPositiveNumber: (value: string): boolean => {
    const num = Number(value);
    return !isNaN(num) && num > 0;
  },
} as const;

export type ValidationResult = {
  isValid: boolean;
  errors: string[];
};

export const validateForm = (
  data: Record<string, any>,
  rules: Record<string, Array<(value: any) => string | null>>
): ValidationResult => {
  const errors: string[] = [];
  
  Object.entries(rules).forEach(([field, fieldRules]) => {
    const value = data[field];
    
    fieldRules.forEach(rule => {
      const error = rule(value);
      if (error) {
        errors.push(error);
      }
    });
  });
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};