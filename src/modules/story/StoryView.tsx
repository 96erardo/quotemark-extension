import React, { useState, useCallback, useContext, Dispatch, SetStateAction } from 'react';
import Box from '@mui/material/Box';
import { Story } from './Story';
import { useStories } from './StoriesContext';

const StoryViewContext = React.createContext<Dispatch<SetStateAction<number>>>(
  (value: number | ((prevValue: number) => void)) => {}
)

export const StoryView: React.FC = ({ children }) => {
  const [index, setIndex] = useState<number>(-1);
  const { items, loading, count, next, seen } = useStories();
  let content = null;

  console.log('items', items);

  const onNext = useCallback(() => {
    setIndex(prevIndex => {
      if (prevIndex < (items.length - 1)) {
        return prevIndex + 1;

      } if (prevIndex < (count - 1)) {
        next();

        return prevIndex + 1;
      }

      return prevIndex;
    })
  }, [items, count, next]);
  
  const onPrev = useCallback(() => {
    setIndex(prevIndex => prevIndex === 0 ? prevIndex : prevIndex - 1);
  }, []);

  if (index !== -1) {
    const { [index]: story } = items;

    content = (
      <Story
        loading={loading}
        story={story}
        index={index}
        total={count - 1}
        onSeen={seen}
        onNext={onNext}
        onPrev={onPrev}
      />
    );
  }

  return (
    <StoryViewContext.Provider value={setIndex}>
      <Box 
        position="relative"
      >
        {children}
        {content}
      </Box>
    </StoryViewContext.Provider>
  );
}

export function useSetStoryView (): Dispatch<SetStateAction<number>> {
  return useContext(StoryViewContext);
}