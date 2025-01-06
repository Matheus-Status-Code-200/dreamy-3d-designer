import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';
import { state } from '../store';
import TShirtCanvas from '../components/Canvas/TShirtCanvas';
import { Button } from '@/components/ui/button';
import { HexColorPicker } from 'react-colorful';

const Index = () => {
  const snap = useSnapshot(state);
  const [showColorPicker, setShowColorPicker] = useState(false);

  return (
    <div className="min-h-screen bg-secondary">
      <nav className="w-full flex justify-between items-center bg-secondary px-8 py-4 border-b">
        <h1 className="text-2xl font-bold text-primary">T-Designer</h1>
        <Button 
          variant="outline"
          onClick={() => setShowColorPicker(!showColorPicker)}
          className="bg-white"
        >
          Pick Color
        </Button>
      </nav>

      <div className="flex flex-col md:flex-row h-[calc(100vh-73px)]">
        <div className="flex-1 h-full w-full">
          <TShirtCanvas />
        </div>

        <div className="w-full md:w-96 bg-white p-8 overflow-y-auto border-l">
          <AnimatePresence>
            {showColorPicker && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mb-8"
              >
                <HexColorPicker 
                  color={snap.color}
                  onChange={(color) => state.color = color}
                  className="w-full"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-primary">Customization</h2>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={() => state.isLogoTexture = !snap.isLogoTexture}
                className={snap.isLogoTexture ? "bg-accent text-white" : ""}
              >
                Logo
              </Button>
              <Button
                variant="outline"
                onClick={() => state.isFullTexture = !snap.isFullTexture}
                className={snap.isFullTexture ? "bg-accent text-white" : ""}
              >
                Texture
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;