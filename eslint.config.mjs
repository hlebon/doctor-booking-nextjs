import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Configuración base de Next.js y TypeScript
  ...compat.extends('next/core-web-vitals'),
  ...compat.extends('next/typescript'),

  // Integración de prettier como plugin de ESLint
  {
    name: 'prettier-integration',
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },

  // Desactiva reglas conflictivas con prettier
  {
    name: 'prettier-config',
    rules: eslintConfigPrettier.rules,
  },
];

export default eslintConfig;
