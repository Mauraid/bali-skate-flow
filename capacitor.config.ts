import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.ee0232ad144b4025a30b109101846adb',
  appName: 'skate-camp-schedule',
  webDir: 'dist',
  server: {
    url: 'https://ee0232ad-144b-4025-a30b-109101846adb.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#ffffff',
      showSpinner: false
    }
  }
};

export default config;