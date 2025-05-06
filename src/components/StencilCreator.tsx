import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { STENCILS, DEFAULT_GRID_SIZE } from '@/lib/constants'; // Assuming STENCILS is exported

interface Stencil {
  id: string;
  name: string;
  data: string[];
}

const StencilCreator: React.FC = () => {
  const [numRows, setNumRows] = useState<number>(DEFAULT_GRID_SIZE.rows);
  const [numCols, setNumCols] = useState<number>(DEFAULT_GRID_SIZE.cols);
  const [grid, setGrid] = useState<boolean[][]>([]);
  const [stencilId, setStencilId] = useState<string>('');
  const [stencilName, setStencilName] = useState<string>('');
  const [outputCode, setOutputCode] = useState<string>('');
  const [selectedStencilId, setSelectedStencilId] = useState<string | undefined>(undefined);

  // Initialize or resize grid
  useEffect(() => {
    const newGrid = Array(numRows)
      .fill(null)
      .map(() => Array(numCols).fill(false));
    setGrid(newGrid);
  }, [numRows, numCols]);

  const handleCellClick = (rIdx: number, cIdx: number) => {
    setGrid((prevGrid) =>
      prevGrid.map((row, rowIndex) =>
        rowIndex === rIdx
          ? row.map((cell, colIndex) => (colIndex === cIdx ? !cell : cell))
          : row
      )
    );
  };

  const handleLoadStencil = () => {
    if (!selectedStencilId) return;
    const stencilToLoad = STENCILS.find(s => s.id === selectedStencilId);
    if (stencilToLoad) {
      setStencilId(stencilToLoad.id);
      setStencilName(stencilToLoad.name);
      const rows = stencilToLoad.data.length;
      const cols = stencilToLoad.data[0]?.length || DEFAULT_GRID_SIZE.cols;
      setNumRows(rows);
      setNumCols(cols);
      
      const newGrid = stencilToLoad.data.map(rowStr => 
        rowStr.split('').map(char => char === 'X')
      );
      // Ensure grid matches new dimensions, padding if necessary
      const normalizedGrid = Array(rows).fill(null).map((_, r) => 
        Array(cols).fill(false).map((__, c) => newGrid[r]?.[c] || false)
      );
      setGrid(normalizedGrid);
      setOutputCode(''); // Clear previous output
    }
  };

  const generateOutputCode = () => {
    const dataArray = grid.map(row => 
      row.map(cell => (cell ? 'X' : ' ')).join('')
    );
    
    const stencilObjectString = `{
  id: '${stencilId || 'new-stencil'}',
  name: '${stencilName || 'New Stencil'}',
  data: [
${dataArray.map(row => `    "${row}"`).join(',\n')}
  ],
},`;
    setOutputCode(stencilObjectString);
  };

  return (
    <div className="p-4 space-y-6 bg-gray-800 text-white rounded-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-center">Stencil Creator/Editor</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
        <div>
          <label htmlFor="loadStencil" className="block text-sm font-medium mb-1">Load Existing Stencil:</label>
          <Select onValueChange={setSelectedStencilId} value={selectedStencilId}>
            <SelectTrigger className="w-full bg-gray-700 border-gray-600">
              <SelectValue placeholder="Select a stencil to load" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 text-white border-gray-600">
              {STENCILS.map(s => (
                <SelectItem key={s.id} value={s.id} className="hover:bg-gray-600 focus:bg-gray-600">
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleLoadStencil} className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">Load Stencil</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="stencilId" className="block text-sm font-medium mb-1">Stencil ID:</label>
          <Input id="stencilId" type="text" placeholder="e.g., my-custom-cat" value={stencilId} onChange={e => setStencilId(e.target.value)} className="bg-gray-700 border-gray-600" />
        </div>
        <div>
          <label htmlFor="stencilName" className="block text-sm font-medium mb-1">Stencil Name:</label>
          <Input id="stencilName" type="text" placeholder="e.g., My Custom Cat" value={stencilName} onChange={e => setStencilName(e.target.value)} className="bg-gray-700 border-gray-600" />
        </div>
        <div>
          <label htmlFor="numRows" className="block text-sm font-medium mb-1">Rows:</label>
          <Input id="numRows" type="number" value={numRows} onChange={e => setNumRows(Math.max(1, parseInt(e.target.value) || 1))} className="bg-gray-700 border-gray-600" />
        </div>
        <div>
          <label htmlFor="numCols" className="block text-sm font-medium mb-1">Columns:</label>
          <Input id="numCols" type="number" value={numCols} onChange={e => setNumCols(Math.max(1, parseInt(e.target.value) || 1))} className="bg-gray-700 border-gray-600" />
        </div>
      </div>

      <p className="text-sm text-gray-400">Click cells to toggle. The grid below will update based on Rows/Columns inputs or loaded stencil.</p>
      <div className="border border-gray-600 p-2 bg-gray-900 overflow-auto select-none" style={{ display: 'grid', gridTemplateColumns: `repeat(${numCols}, 20px)` }}>
        {grid.map((row, rIdx) => 
          row.map((cell, cIdx) => (
            <div 
              key={`${rIdx}-${cIdx}`}
              onClick={() => handleCellClick(rIdx, cIdx)}
              className={`w-5 h-5 border border-gray-700 cursor-pointer hover:bg-gray-500 ${cell ? 'bg-yellow-400' : 'bg-gray-800'}`}
              title={`(${rIdx+1}, ${cIdx+1})`}
            />
          ))
        )}
      </div>

      <Button onClick={generateOutputCode} className="w-full bg-green-600 hover:bg-green-700 mt-4">Generate Stencil Code</Button>

      {outputCode && (
        <div className="mt-4">
          <label htmlFor="outputCode" className="block text-sm font-medium mb-1">Generated Code (copy this into constants.ts):</label>
          <Textarea id="outputCode" value={outputCode} readOnly rows={Math.max(5, numRows + 6)} className="bg-gray-700 border-gray-600 font-mono text-sm" />
        </div>
      )}
    </div>
  );
};

export default StencilCreator;
