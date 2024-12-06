import React, { useState, useRef, KeyboardEvent } from 'react';
import { extractUrls, getLinkPreview, isVideoUrl } from '../../utils/linkParser';
import { PostMedia } from '../../types/post';
import EmojiPicker from '../posts/EmojiPicker';
import GifPicker from '../posts/GifPicker';

interface MediaInputProps {
  onSubmit: (content: string, media?: PostMedia[]) => void;
  placeholder?: string;
  showIcons?: boolean;
  buttonText?: string;
  autoFocus?: boolean;
}

function MediaInput({ 
  onSubmit, 
  placeholder = "Write something...", 
  showIcons = true,
  buttonText = "Post",
  autoFocus = false
}: MediaInputProps) {
  const [content, setContent] = useState('');
  const [media, setMedia] = useState<PostMedia[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showGifPicker, setShowGifPicker] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleContentChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);

    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }

    // Process URLs
    const urls = extractUrls(newContent);
    if (urls.length > 0) {
      setIsProcessing(true);
      const newMedia = await Promise.all(
        urls.map(async (url) => {
          if (isVideoUrl(url)) {
            return { type: 'video' as const, url };
          } else {
            const preview = await getLinkPreview(url);
            return {
              type: 'link' as const,
              url,
              thumbnail: preview.image,
              title: preview.title,
              description: preview.description
            };
          }
        })
      );
      setMedia(prevMedia => [...prevMedia, ...newMedia]);
      setIsProcessing(false);
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (content.trim() || media.length > 0) {
      onSubmit(content, media);
      setContent('');
      setMedia([]);
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newMedia = Array.from(files).map(file => ({
        type: 'image' as const,
        url: URL.createObjectURL(file)
      }));
      setMedia(prevMedia => [...prevMedia, ...newMedia]);
    }
  };

  const handleEmojiSelect = (emoji: any) => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      const newContent = 
        content.substring(0, start) + 
        emoji.native + 
        content.substring(end);
      setContent(newContent);
      
      // Set cursor position after emoji
      setTimeout(() => {
        textareaRef.current?.setSelectionRange(
          start + emoji.native.length,
          start + emoji.native.length
        );
        textareaRef.current?.focus();
      }, 0);
    } else {
      setContent(prev => prev + emoji.native);
    }
  };

  const handleGifSelect = (gifUrl: string) => {
    const newMedia = [{
      type: 'image' as const,
      url: gifUrl
    }];
    setMedia(prevMedia => [...prevMedia, ...newMedia]);
  };

  const handlePaste = async (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    const mediaItems: PostMedia[] = [];

    for (const item of Array.from(items)) {
      if (item.type.startsWith('image/')) {
        const file = item.getAsFile();
        if (file) {
          mediaItems.push({
            type: 'image',
            url: URL.createObjectURL(file)
          });
        }
      }
    }

    if (mediaItems.length > 0) {
      setMedia(prevMedia => [...prevMedia, ...mediaItems]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex space-x-2">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleContentChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          placeholder={placeholder}
          className="flex-1 bg-[#2a2f38] rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 text-white min-h-[40px] resize-none overflow-hidden"
          rows={1}
          autoFocus={autoFocus}
        />
        {showIcons && (
          <>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-gray-400 hover:text-gray-300 bg-[#2a2f38] rounded-lg"
              title="Upload image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="p-2 text-gray-400 hover:text-gray-300 bg-[#2a2f38] rounded-lg"
              title="Add emoji"
            >
              <span className="text-xl">😊</span>
            </button>
            <button
              type="button"
              onClick={() => setShowGifPicker(!showGifPicker)}
              className="p-2 text-gray-400 hover:text-gray-300 bg-[#2a2f38] rounded-lg"
              title="Add GIF"
            >
              <span className="font-medium">GIF</span>
            </button>
          </>
        )}
        <button
          type="submit"
          disabled={(!content.trim() && media.length === 0) || isProcessing}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? 'Processing...' : buttonText}
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        multiple
        className="hidden"
        onChange={handleFileUpload}
      />

      {media.length > 0 && (
        <div className="grid grid-cols-2 gap-2">
          {media.map((item, index) => (
            <div key={index} className="relative">
              {item.type === 'image' && (
                <img 
                  src={item.url} 
                  alt="Media preview" 
                  className="w-full h-32 object-cover rounded-lg"
                />
              )}
              {item.type === 'video' && (
                <div className="w-full h-32 bg-[#2a2f38] rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              )}
              <button
                type="button"
                onClick={() => setMedia(media.filter((_, i) => i !== index))}
                className="absolute top-2 right-2 p-1 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {showEmojiPicker && (
        <EmojiPicker
          onSelect={handleEmojiSelect}
          onClose={() => setShowEmojiPicker(false)}
        />
      )}

      {showGifPicker && (
        <GifPicker
          onSelect={handleGifSelect}
          onClose={() => setShowGifPicker(false)}
        />
      )}
    </form>
  );
}

export default MediaInput;