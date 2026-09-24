import { createContext, useContext } from 'react';

// App owns the data. Both author and user subtrees can consume the same note.
// Shape: null | { stepId: 'shots', timestamp: '2:03', text: string }.
export const AuthorNoteContext = createContext(null);
export function useAuthorNote() {
  const value = useContext(AuthorNoteContext);
  if (!value) throw new Error('useAuthorNote requires AuthorNoteContext.Provider');
  return value;
}
