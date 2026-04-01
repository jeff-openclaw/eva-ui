import type { Preview } from '@storybook/react';
import '../src/styles/globals.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'eva-void',
      values: [
        { name: 'eva-void', value: '#080808' },
        { name: 'eva-panel', value: '#120808' },
      ],
    },
    layout: 'fullscreen',
  },
};
export default preview;
