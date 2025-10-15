'use client';

import { Mic, MicOff } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: (event: any) => void;
  onerror: (event: any) => void;
  onend: () => void;
}

declare global {
  interface Window {
    SpeechRecognition: {
      new (): SpeechRecognition;
    };
    webkitSpeechRecognition: {
      new (): SpeechRecognition;
    };
  }
}

type RecorderProps = {
  onTranscriptChange: (transcript: string) => void;
  initialTranscript: string;
};

export default function Recorder({ onTranscriptChange, initialTranscript }: RecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const finalTranscriptRef = useRef(initialTranscript);

  useEffect(() => {
    finalTranscriptRef.current = initialTranscript;
  }, [initialTranscript]);

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
    } else {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert('Speech recognition is not supported in this browser.');
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscriptRef.current += event.results[i][0].transcript + ' ';
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        onTranscriptChange(finalTranscriptRef.current + interimTranscript);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
      };
      
      recognition.onend = () => {
        setIsRecording(false);
      }

      recognitionRef.current = recognition;
      recognition.start();
      setIsRecording(true);
    }
  };

  return (
    <Button
      type="button"
      size="icon"
      onClick={toggleRecording}
      className={cn(
        'rounded-full h-14 w-14 transition-colors duration-300',
        isRecording ? 'bg-red-500 hover:bg-red-600 pulse-ring' : 'bg-primary'
      )}
      aria-label={isRecording ? 'Stop recording' : 'Start recording'}
    >
      {isRecording ? <MicOff className="h-7 w-7" /> : <Mic className="h-7 w-7" />}
    </Button>
  );
}
