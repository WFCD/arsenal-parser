import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/ArsenalParser.ts'],
  dts: true,
});