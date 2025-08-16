# Civic Engineering Team - Fullstack Project Assignment

## Overview

This is a **pass/fail** assignment for applicants joining the core engineering team at Civic. You must complete this project to demonstrate your proficiency in modern web development technologies and practices.

## Project Requirements

### Core Technology Stack

- **Next.js** (latest stable version)
- **Plate.js** (rich text editor)
- **TypeScript** (required)
- **Shadcn/ui** (for popover components)

### Application Structure

Create a Next.js application with two separate pages:

- `/happy` - Text editor with AI that rewrites content to be positive/happy
- `/sad` - Text editor with AI that rewrites content to be negative/sad

## Detailed Requirements

### 1. Next.js Setup

- Initialize a new Next.js application using TypeScript
- Set up proper routing for the `/happy` and `/sad` pages
- Use modern Next.js App Router

### 2. Plate.js Integration

#### Both Pages Must Include

- Full Plate.js rich text editor implementation
- Proper TypeScript configuration
- Clean, maintainable code structure

#### AI Slash Commands

- **On `/happy` page**: Implement a slash command that takes user input and rewrites it to be happy/positive
- **On `/sad` page**: Implement a slash command that takes user input and rewrites it to be sad/negative

**Example slash command behavior:**

```text
User types: "The weather is okay today /rewrite"
AI processes and returns: "The weather is absolutely beautiful today!" (on happy page)
AI processes and returns: "The weather is dreary and disappointing today" (on sad page)
```

### 3. Data Persistence

- **Local Storage Integration**: Save editor content to local storage
- **Persistence**: When users refresh the page, their content should be restored
- **Code Reusability**: Minimize code duplication between the two pages

### 4. Custom Interactive Elements

Create custom Plate.js element types for enhanced interactivity:

- **Custom Element Types**: Implement custom Plate.js plugins to create unique element types when the user types in the words "happy" or "sad"
- **Pointer Cursor**: Text with "happy" or "sad" element types should show a **pointer cursor** on hover
- **Click Interaction**: Users should be able to click on "happy" or "sad" text elements
- **Shadcn Popover Integration**: Clicking should trigger a shadcn popover that displays:
  - A random happy quote when clicking "happy" text
  - A random sad quote when clicking "sad" text
- **Cross-Page Functionality**: This behavior should work on both `/happy` and `/sad` pages
- **Proper Typing**: Implement full TypeScript support for the custom element types

### 5. Real-time Collaboration

- Implement Plate.js collaboration features as demonstrated in the [official collaboration example](https://platejs.org/docs/examples/collaboration)
- Use the YjsPlugin with WebRTC or HocusPocus providers for real-time synchronization
- Two users in separate browsers should be able to edit the same document simultaneously
- Implement room-based collaboration (users can share room IDs to collaborate)

## Technical Specifications

### Project Structure (Recommended)

```text
your-project/
├── src/
│   ├── app/
│   │   ├── happy/
│   │   │   └── page.tsx
│   │   ├── sad/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── components/
│   │   ├── editor/
│   │   │   ├── PlateEditor.tsx
│   │   │   ├── AISlashCommand.tsx
│   │   │   ├── CollaborationPlugin.tsx
│   │   │   ├── HappyElement.tsx
│   │   │   └── SadElement.tsx
│   │   └── ui/
│   │       ├── popover.tsx (shadcn)
│   │       ├── button.tsx (shadcn)
│   │       └── quote-popover.tsx
│   ├── hooks/
│   │   ├── useLocalStorage.ts
│   │   └── useAI.ts
│   ├── lib/
│   │   ├── ai.ts
│   │   ├── plate-config.ts
│   │   ├── collaboration.ts
│   │   └── quotes.ts
│   └── types/
│       ├── index.ts
│       └── plate-elements.ts
├── package.json
├── tsconfig.json
└── README.md
```

### Custom Element Implementation Example

**Expected behavior for custom elements:**

```text
Example content: "I feel happy today because the weather is nice"

- The word "happy" should be a custom Plate.js element with type "happy-text"
- Hovering shows pointer cursor
- Clicking triggers shadcn popover with a random happy quote like:
  "Happiness is not something ready made. It comes from your own actions." - Dalai Lama
```

**Technical Implementation Requirements:**

- Create custom Plate.js plugins for `happy-text` and `sad-text` element types
- Implement element detection (transform regular text containing "happy"/"sad" into custom elements)
- Use shadcn popover component with quote data
- Maintain element state during serialization/deserialization for local storage
- Ensure elements work with collaboration (other users see the same interactive elements)

### Key Implementation Guidelines

#### AI Integration

- You may use any AI provider (OpenAI, Anthropic, local models, etc.)

#### Local Storage

- Create a reusable hook for local storage operations
- Handle edge cases (storage quotas, JSON parsing errors)
- Implement proper TypeScript typing for stored data

#### Collaboration

- Follow the [Plate.js collaboration example](https://platejs.org/docs/examples/collaboration) implementation
- Use YjsPlugin with WebRTC or HocusPocus providers as demonstrated
- Implement room-based collaboration with shareable room IDs
- Handle user identification and cursor colors for multi-user editing

#### Custom Interactive Elements

- Create custom Plate.js plugins for "happy" and "sad" element types
- Implement proper element detection, rendering, and click handling
- Integrate shadcn popover components with quote data
- Use TypeScript interfaces for custom element data structures
- Ensure custom elements work seamlessly with collaboration features
- Handle element serialization for local storage persistence

#### Shadcn UI Integration

- Set up shadcn/ui components in your Next.js project
- Use the Popover component for displaying quotes
- Implement proper styling and theming
- Ensure components work with the overall design system

## Evaluation Criteria

### Pass Requirements (All Must Be Met)

1. ✅ **Functionality**: Both pages work as specified
2. ✅ **AI Integration**: Slash commands successfully rewrite content
3. ✅ **Persistence**: Local storage works correctly
4. ✅ **Collaboration**: Real-time editing between browsers
5. ✅ **Custom Interactive Elements**: Clickable "happy"/"sad" text with shadcn popovers displaying quotes
6. ✅ **TypeScript**: Proper typing throughout
7. ✅ **Code Quality**: Clean, maintainable, non-repetitive code

## Submission Guidelines

### Required Deliverables

1. **Complete source code** in a Git repository
2. **Live demo** (deployed to Vercel, Netlify, or similar)
3. **Loom video** (a quick voiceover displaying the implemented features)

## Resources

### Plate.js Documentation

- [Official Documentation](https://platejs.org/)
- [Collaboration Guide](https://platejs.org/docs/collaboration)
- [Plugin Development](https://platejs.org/docs/plugins)

### Next.js Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript with Next.js](https://nextjs.org/docs/basic-features/typescript)

## Questions and Support

If you have questions about requirements or need clarification:

1. Review this document thoroughly first
2. Check the referenced documentation
3. Contact the engineering team for specific technical clarifications

## Timeline and Next Steps

- **No deadline**: Complete the assignment at your own pace
- **Upon completion**: Submit your project and you can join the team immediately upon passing review
- **Review process**: Our engineering team will review your submission (pass/fail)
- **If you pass**: You'll have a friendly chat with the team and be welcomed to Civic!

---

**Remember**: This is a pass/fail assignment. Meeting all core requirements is essential for joining the Civic engineering team. Focus on solid implementation over flashy features.

Good luck! 🚀
