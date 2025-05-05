
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Brush, TextCursor, Undo } from 'lucide-react';
import { TOOLS } from '@/lib/constants';

interface ToolBarProps {
  activeTool: string;
  setActiveTool: (tool: string) => void;
  onTextSubmit: (text: string) => void;
  onClear: () => void;
  onUndo: () => void;
}

const ToolBar: React.FC<ToolBarProps> = ({ activeTool, setActiveTool, onTextSubmit, onClear, onUndo }) => {
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);
  
  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onTextSubmit(text);
      setOpen(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4 justify-center items-center bg-gray-800 p-4 rounded-lg">
      <Button
        variant="outline"
        size="icon"
        className={cn(
          "transition-all",
          activeTool === TOOLS.PAINT ? "bg-blue-600 text-white" : "bg-gray-700 hover:bg-gray-600"
        )}
        onClick={() => setActiveTool(TOOLS.PAINT)}
        title="Paint Tool"
      >
        <Brush className="h-5 w-5" />
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "transition-all",
              activeTool === TOOLS.TEXT ? "bg-blue-600 text-white" : "bg-gray-700 hover:bg-gray-600"
            )}
            onClick={() => setActiveTool(TOOLS.TEXT)}
            title="Text Tool"
          >
            <TextCursor className="h-5 w-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>Add Text</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleTextSubmit} className="space-y-4">
            <Input
              placeholder="Enter text..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
            />
            <Button type="submit" className="w-full">Apply Text</Button>
          </form>
        </DialogContent>
      </Dialog>

      <Button
        variant="outline"
        size="icon"
        className="bg-gray-700 hover:bg-gray-600 transition-all"
        onClick={onUndo}
        title="Undo"
      >
        <Undo className="h-5 w-5" />
      </Button>
      
      <div className="ml-auto">
        <Button 
          variant="destructive" 
          onClick={onClear} 
          className="bg-red-600 hover:bg-red-700"
        >
          Clear
        </Button>
      </div>
    </div>
  );
};

export default ToolBar;
