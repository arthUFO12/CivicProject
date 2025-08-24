

import { createPlatePlugin, PlateElement, PlateLeaf } from 'platejs/react'
import SentimentElement from '../SentimentElement'
import { Editor} from 'platejs'


export default function createSentimentPlugin({mode}:{mode: 'happy' | 'sad'}) {

  const MyPlugin = createPlatePlugin({
  key: 'sentiment',
  node: {
    isLeaf: true,
    component: SentimentElement,
  },
  options: {
    sentiment: mode,
  },

});

// Later, inside an async context (e.g., onClick handler)
  return MyPlugin;
}
