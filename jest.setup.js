require('@testing-library/jest-dom');

jest.mock('i18next', () => {
  const mockI18n = {
    init: jest.fn(),
    use: jest.fn(() => mockI18n),
    changeLanguage: jest.fn(),
    language: 'en',
  };
  return mockI18n;
});

jest.mock('i18next-http-backend', () => ({
  __esModule: true,
  default: {
    type: 'backend',
  },
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      changeLanguage: jest.fn(),
      language: 'en',
    },
  }),
  initReactI18next: {
    type: '3rdParty',
    init: jest.fn(),
  },
}));