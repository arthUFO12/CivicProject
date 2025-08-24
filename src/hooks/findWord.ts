import { Value, TElement} from "platejs";

// Utility hook: scans editor content for a matching word/command.
// - Calls the provided async function when a match is found.
// - Useful for triggers like "/rewrite" or sentiment keywords.
export default function findWord(func: (element: TElement, position: number) => Promise<void>, match: string) {
  // Search function: loops through editor nodes and children
  async function find(val: Value) {
    for (let i = 0; i < val.length; i++) {
      for (let j = 0; j < val[i].children.length; j++) {
        // If child text includes the match, run the callback on the element
        if ((val[i].children[j].text as string).includes(match)) {
          await func(val[i], i);
        }
      }
    }
  }

  return { find };
}
