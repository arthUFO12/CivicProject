'use client';

// Rich text editor client component built on Plate.js for the Civic assignment.
// - Provides happy/sad rewriting via slash commands.
// - Saves and restores state with localStorage.
// - Includes sentiment plugin to detect keywords and mark them.
// - Adds a toolbar for headings, quotes, and text formatting.

import * as React from 'react';

import { Value, TElement } from 'platejs';
import findWord from '@/hooks/findWord';

import {
  BoldPlugin,
  ItalicPlugin,
  UnderlinePlugin,
  H1Plugin,
  H2Plugin,
  H3Plugin,
  BlockquotePlugin
} from '@platejs/basic-nodes/react';

import createSentimentPlugin from '@/components/editor/plugins/SentimentPlugin'
import {
  Plate,
  usePlateEditor
} from 'platejs/react';

import { BlockquoteElement } from '@/components/ui/blockquote-node';
import { Editor, EditorContainer } from '@/components/ui/editor';
import { H1Element, H2Element, H3Element } from '@/components/ui/heading-node'
import { FixedToolbar } from '@/components/ui/fixed-toolbar';
import { MarkToolbarButton } from '@/components/ui/mark-toolbar-button';
import { ToolbarButton } from '@/components/ui/toolbar';

import { useAIRewrite } from "@/hooks/useAI";

// Starting value for the editor
const initialValue: Value = [
  {
    type: 'p',
    children: [
      { text: '' },
    ],
  },
];

// Utility: reapply font styles when inserting rewritten text
function matchFont(originalText: TElement, rewritten: string): TElement {
  let matchedRichText: TElement = { 
    type: originalText.type,
    children: []
  };

  const children = originalText.children
  let place = 0

  // Iterate over original children and assign their formatting to new slices
  for (let i = 0; i < children.length; i ++) {
    if (place > rewritten.length) break;
    const length = ( i === children.length - 1) 
      ? rewritten.length - place 
      : (children[i].text as string).length;

    matchedRichText['children'].push({
      text: rewritten.slice(place, (place + length <= rewritten.length) ? place + length : rewritten.length),
      bold: children[i].bold ?? false,
      italic: children[i].italic ?? false,
      underline: children[i].underline ?? false
    });

    place += (children[i].text as string).length
  }

  return matchedRichText;
}

// Main editor client component
export default function PlateEditorClient({ mode }: { mode: "happy" | "sad"}) {
  // sentiment plugin depending on mode
  const sentimentPlugin = createSentimentPlugin({ mode });

  // Initialize editor with plugins and starting value
  const editor = usePlateEditor({
    plugins: [
      BoldPlugin,
      sentimentPlugin,
      ItalicPlugin,
      UnderlinePlugin,
      BlockquotePlugin.withComponent(BlockquoteElement),
      H1Plugin.withComponent(H1Element),
      H2Plugin.withComponent(H2Element),
      H3Plugin.withComponent(H3Element)
    ],
    value: initialValue       
  });

  // Restore from localStorage if available
  React.useEffect(() => {
    const saved = localStorage.getItem(`${mode}-key`);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Remove ids before replacing Values
      const clean = parsed.map((node: any) => {
        const { id, ...rest } = node;
        return rest;
      });
      editor.tf.removeNodes({ at: [0] });
      editor.tf.insertNodes(clean, { at: [0] });
    }
  }, [])

  const { rewrite } = useAIRewrite(mode);

  // Handle rewriting logic when /rewrite is detected
  const rewriteHandle = React.useCallback(async (element: TElement, elementPosition: number) => {
    const toRewrite = element.children.map(child => child.text).join('');
    const cleaned = toRewrite.replace(/\/rewrite/g, '').trim()

    const rewritten = await rewrite(cleaned);
    editor.tf.removeNodes({ at : [elementPosition] });
    editor.tf.insertNodes(matchFont(element, rewritten))
    editor.tf.select({
      anchor: { path: [elementPosition,0], offset: rewritten.length },
      focus: { path: [elementPosition,0], offset: rewritten.length }
    })
  }, [])

  // Handle sentiment marking when "happy" or "sad" keywords appear
  const sentimentHandle = React.useCallback(async (element: TElement, elementPosition: number) => {
    if (element.children[0]['sentiment']) return;

    // Select element and apply sentiment mark
    editor.tf.select({
      anchor: { path: [elementPosition,0], offset: 0 },
      focus: { path: [elementPosition,element.children.length - 1],
               offset: (element.children[element.children.length-1].text as string).length }
    });

    editor.tf.addMark('sentiment', true);

    // Remove mark at end so only keyword is styled
    editor.tf.select({
      anchor: { path: [elementPosition,element.children.length - 1],
                offset: (element.children[element.children.length - 1].text as string).length },
      focus: { path: [elementPosition,element.children.length - 1],
               offset: (element.children[element.children.length - 1].text as string).length }
    });
    editor.tf.removeMark('sentiment');
  }, []);

  // Check content for "/rewrite" keyword
  const rewriteCheck = React.useCallback(async (val: Value) => {
    const { find } = findWord(rewriteHandle, "/rewrite");
    find(val);
  },[]);

  // Check content for sentiment keywords
  const sentimentCheck = React.useCallback(async (val: Value) => {
    const { find } = findWord(sentimentHandle, mode);
    find(val);
  }, []);

  return (
    <div className="border-3 border-black bg-white rounded-xl">
      <Plate editor={editor} onChange={({value}) => {
        rewriteCheck(value);
        sentimentCheck(value);
        // Persist to localStorage each change
        localStorage.setItem(`${mode}-key`, JSON.stringify(value));
      }}>
        <FixedToolbar className="justify-start rounded-t-lg">
          <ToolbarButton onClick={() => editor.tf.h1.toggle()}>H1</ToolbarButton>
          <ToolbarButton onClick={() => editor.tf.h2.toggle()}>H2</ToolbarButton>
          <ToolbarButton onClick={() => editor.tf.h3.toggle()}>H3</ToolbarButton>
          <ToolbarButton onClick={() => editor.tf.blockquote.toggle()}>Quote</ToolbarButton>
          <MarkToolbarButton nodeType="bold" tooltip="Bold (⌘+B)">B</MarkToolbarButton>
          <MarkToolbarButton nodeType="italic" tooltip="Italic (⌘+I)">I</MarkToolbarButton>
          <MarkToolbarButton nodeType="underline" tooltip="Underline (⌘+U)">U</MarkToolbarButton>
          <div className="flex-1" />
          <ToolbarButton className="px-2" onClick={() => editor.tf.setValue(initialValue)}>
            Reset
          </ToolbarButton>
        </FixedToolbar>
        
        <EditorContainer>
          <Editor placeholder="Type your amazing content here..." />
        </EditorContainer>
      </Plate>
    </div>
  );
}
