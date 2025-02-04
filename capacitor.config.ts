import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.horalix.dctkidlofkgiiddfeehn',
  appName: 'Horalix',
  webDir: 'dist',
  server: {
    url: 'https://dctkidlofkgiiddfeehn.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: 'release-key.keystore',
      keystoreAlias: 'horalix',
      keystorePassword: 'your_keystore_password',
      storePassword: 'your_store_password',
      releaseType: 'APK'
    }
  }
};

export default config;