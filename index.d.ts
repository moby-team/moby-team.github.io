export {};

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
    webkitSpeechSynthesis: any;
  }
}