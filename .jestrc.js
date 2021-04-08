module.exports = {
    moduleFileExtensions: ['js', 'ts'],
    roots: ['<rootDir>/src'],
    testMatch: ['**/*.spec.(js|ts)'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    coverageDirectory: "../coverage",
    coverageReporters: ["json", "lcov", "html"],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    setupFiles: [],
    transformIgnorePatterns: ['/node_modules/'],
    testPathIgnorePatterns: ['__testUtils__'],
    clearMocks: true,
    restoreMocks: true,
};
