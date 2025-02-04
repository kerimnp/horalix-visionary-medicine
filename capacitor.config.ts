import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.horalix.dctkidlofkgiiddfeehn',
  appName: 'Horalix',
  webDir: 'dist',
  server: {
    url: 'https://dctkidlofkgiiddfeehn.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  ios: {
    contentInset: 'automatic'
  }
};

export default config;