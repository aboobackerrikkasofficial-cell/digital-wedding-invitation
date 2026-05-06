import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.smartwedding.app',
  appName: 'Smart Wedding',
  webDir: 'out',
  server: {
    url: 'https://digital-wedding-invitation-two.vercel.app/',
    cleartext: true
  },
  plugins: {
    StatusBar: {
      backgroundColor: '#C5A059',
    },
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#ffffff',
      showSpinner: true,
      androidSpinnerStyle: 'large',
      iosSpinnerStyle: 'small',
      spinnerColor: '#C5A059',
    },
  },
};

export default config;
