import React from 'react';
import { createRoot } from 'react-dom/client';
import Controls from './controls';

it('controls render without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  root.render(<Controls />);
  root.unmount();
});