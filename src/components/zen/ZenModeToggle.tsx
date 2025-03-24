import React from 'react';
import { Button } from '@/components/ui/button';
import { useZenMode } from '@/contexts/ZenModeContext';
import { Moon, Sun } from 'lucide-react';

const ZenModeToggle: React.FC = () => {
  const { state, actions } = useZenMode();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={actions.toggleZenMode}
      aria-label={state.isActive ? "Exit Zen Mode" : "Enter Zen Mode"}
      title={state.isActive ? "Exit Zen Mode" : "Enter Zen Mode"}
      className="w-9 px-0"
    >
      {state.isActive ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  );
};

export default ZenModeToggle; 