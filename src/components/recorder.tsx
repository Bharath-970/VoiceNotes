'use client';

import { Mic, MicOff } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
  
  const onTranscriptChangeRef = useRef(onTranscriptChange);
  onTranscriptChangeRef.current = onTranscriptChange;

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    let finalTranscript = initialTranscript;

    recognition.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      onTranscriptChangeRef.current(finalTranscript + interimTranscript);
    };
    
    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      toast({
        variant: 'destructive',
        title: 'Speech Recognition Error',
        description: event.error === 'not-allowed' ? 'Microphone access denied.' : event.error,
      });
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognitionRef.current?.stop();
    };
  }, [initialTranscript, toast]);

  const toggleRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast({
        variant: 'destructive',
        title: 'Unsupported Browser',
        description: 'Speech recognition is not supported in this browser.',
      });
      return;
    }

    if (isRecording) {
      recognitionRef.current?.stop();
    } else {
      // We need to re-initialize the final transcript from the initial prop when starting a new recording session
      // if the initialTranscript prop has changed. The easiest way is to let the effect handle it.
      if (recognitionRef.current) {
         recognitionRef.current.start();
         setIsRecording(true);
      }
    }
  };
  
  // This effect handles stopping the recognition when the component unmounts.
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

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