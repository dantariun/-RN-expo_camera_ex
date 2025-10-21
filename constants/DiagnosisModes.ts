export const DIAGNOSIS_MODES = {
  TONGUE: 'TONGUE_DIAGNOSIS',
  DEMENTIA: 'DEMENTIA_DIAGNOSIS',
  // 추후 다른 모드 추가 가능
} as const; // as const로 타입을 더욱 엄격하게 관리

// DIAGNOSIS_MODES 객체의 value들만 모아서 타입으로 만듭니다.
export type DiagnosisMode = typeof DIAGNOSIS_MODES[keyof typeof DIAGNOSIS_MODES];