import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/app/stella/tests/unit/**/*.test.ts'],
    pool: 'forks',
    fileParallelism: false,
    isolate: true,
  },
})