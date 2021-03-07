import path from 'path';
import vue from '@vitejs/plugin-vue';

export default {
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  optimizeDeps: {
    exclude: ['chusho'],
  },
};
