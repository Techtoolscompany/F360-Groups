import React from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

interface EmojiPickerProps {
  onSelect: (emoji: any) => void;
  onClose: () => void;
}

function EmojiPicker({ onSelect, onClose }: EmojiPickerProps) {
  return (
    <div className="absolute z-50 bottom-full mb-2">
      <div className="relative">
        <div className="absolute top-0 right-0 mt-2 mr-2">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-full bg-[#2a2f38]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <Picker
          data={data}
          onEmojiSelect={(emoji: any) => {
            onSelect(emoji);
            onClose();
          }}
          theme="dark"
          previewPosition="none"
          skinTonePosition="none"
        />
      </div>
    </div>
  );
}

export default EmojiPicker;