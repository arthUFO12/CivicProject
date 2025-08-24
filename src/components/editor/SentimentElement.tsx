import * as React from 'react';


import { Popover, PopoverTrigger, PopoverContent} from '@/components/ui/popover'
import { useAIQuote } from '@/hooks/useAI'


type SentimentElementProps = {
attributes: React.HTMLAttributes<HTMLSpanElement>
children: React.ReactNode
sentiment: "happy" | "sad"
}


// Inline component for sentiment-highlighted text ("happy" or "sad").
// - Wraps children in a clickable span that triggers a popover.
// - Popover shows a random happy/sad quote using AI hook.
export default function SentimentElement({ attributes, children, sentiment }: SentimentElementProps) {
  const { className, ...otherAttributes } = attributes;


  // Hook provides a function that fetches a quote based on sentiment
  const { quote } = useAIQuote(sentiment);


  // State to hold the popover text once retrieved
  const [popoverText, changePopoverText] = React.useState<string>('');


  // Load initial quote when component mounts
  const initPopover = React.useCallback(async () => {
    changePopoverText(await quote());
  }, []);


  React.useEffect(() => {
    initPopover()
  }, [])


  return (
    <Popover>
      <PopoverTrigger asChild>
        {/* Sentiment words are clickable and show pointer cursor */}
        <span {...otherAttributes} className={"cursor-pointer " + className}>{children}</span>
      </PopoverTrigger>

      <PopoverContent>
        <p>{popoverText}</p>
      </PopoverContent>
    </Popover>
  )
}