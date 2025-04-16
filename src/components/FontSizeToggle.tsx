import React from 'react';
import { TbTextSize } from 'react-icons/tb';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from './ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger 
} from './ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

export const FontSizeToggle = () => {
  const { fontSize, setFontSize } = useTheme();
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full">
                {/* Text size icon from react-icons */}
                <TbTextSize className="h-5 w-5" />
                <span className="sr-only">Adjust font size</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Font Size</DropdownMenuLabel>
              <DropdownMenuItem 
                onClick={() => setFontSize('small')} 
                className={fontSize === 'small' ? 'bg-accent text-accent-foreground hover:cursor-pointer' : 'hover:cursor-pointer'}
              >
                Small
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setFontSize('medium')} 
                className={fontSize === 'medium' ? 'bg-accent text-accent-foreground hover:cursor-pointer' : 'hover:cursor-pointer'}
              >
                Medium
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setFontSize('large')} 
                className={fontSize === 'large' ? 'bg-accent text-accent-foreground hover:cursor-pointer' : 'hover:cursor-pointer'}
              >
                Large
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TooltipTrigger>
        <TooltipContent>
          <p>Adjust text size</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};