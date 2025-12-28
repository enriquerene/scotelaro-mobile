import { defineConfig } from 'vite'

export default defineConfig({
  define: {
    'process.env.TAMAGUI_TARGET': '"web"',
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    // Prevent color function errors
    'process.env.STORYBOOK': 'true',
  },

  resolve: {
    alias: {
      'react-native': 'react-native-web',
      'react-native-svg': 'react-native-svg/lib/commonjs/ReactNativeSVG.web.js',
    },
  },

  optimizeDeps: {
    include: [
      'react-native-web',
      '@tamagui/core',
      '@tamagui/config',
      'tamagui',
    ],
  },

  esbuild: {
    loader: 'tsx',
    include: /src\/.*\.[tj]sx?$/,
    exclude: [],
  },

  css: {
    postcss: {
      plugins: [],
    },
  },
})
