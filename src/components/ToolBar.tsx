import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Brush, TextCursor, Undo, FilePlus, Download } from 'lucide-react';
import { TOOLS } from '@/lib/constants';

interface ToolBarProps {
  activeTool: string;
  onToolChange: (tool: string) => void;
  onTextSubmit: (text: string) => void;
  onClear: () => void;
  onUndo: () => void;
  onNewScene: () => void;
  onExport: () => void;
}

const ToolBar: React.FC<ToolBarProps> = ({ activeTool, onToolChange, onTextSubmit, onClear, onUndo, onNewScene, onExport }) => {
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
    <div className="flex flex-col gap-2"> 
      <Button
        size="icon"
        className={cn(
          "transition-all rounded-md",
          activeTool === TOOLS.PAINT 
            ? "bg-blue-600 text-white hover:bg-blue-700" 
            : "bg-gray-700 text-gray-400 hover:bg-gray-600"
        )}
        onClick={() => onToolChange(TOOLS.PAINT)}
        title="Paint Tool"
      >
        <Brush className="h-5 w-5" />
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            size="icon"
            className={cn(
              "transition-all rounded-md",
              activeTool === TOOLS.TEXT 
                ? "bg-blue-600 text-white hover:bg-blue-700" 
                : "bg-gray-700 text-gray-400 hover:bg-gray-600"
            )}
            onClick={() => onToolChange(TOOLS.TEXT)}
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
        size="icon"
        className="bg-gray-700 text-gray-400 hover:bg-gray-600 transition-all rounded-md"
        onClick={onNewScene}
        title="New Scene (Clear Board)"
      >
        <FilePlus className="h-5 w-5" />
      </Button>

      <Button
        size="icon"
        className="bg-gray-700 text-gray-400 hover:bg-gray-600 transition-all rounded-md" 
        onClick={onUndo}
        title="Undo"
      >
        <Undo className="h-5 w-5" />
      </Button>

      <Button
        size="icon"
        className="bg-gray-700 text-gray-400 hover:bg-gray-600 transition-all rounded-md"
        onClick={onExport}
        title="Export as PNG"
      >
        <Download className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default ToolBar;
