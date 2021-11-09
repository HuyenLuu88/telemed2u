export const DEFAULT_VIDEO_CONSTRAINTS: MediaStreamConstraints['video'] = {
  width: 1280,
  height: 720,
  frameRate: 24,
};

export const config = {
  dev: {
    baseURL: "https://dev.telemed2u.com/login-service",
    backendURL: "https://dev.telemed2u.com/login-service"
    // baseURL: "http://localhost:3000",
  },
  KEY: 'QFhN7TNh7hpTjMbji6k71nZsHQWbOROz'
};

// These are used to store the selected media devices in localStorage
export const SELECTED_AUDIO_INPUT_KEY = 'TwilioVideoApp-selectedAudioInput';
export const SELECTED_AUDIO_OUTPUT_KEY = 'TwilioVideoApp-selectedAudioOutput';
export const SELECTED_VIDEO_INPUT_KEY = 'TwilioVideoApp-selectedVideoInput';
