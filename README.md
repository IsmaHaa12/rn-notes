# React Native Notes (Source Pack)
Ini adalah paket **sumber kode** (src) untuk aplikasi catatan dengan Navigation + Redux Persist + optimasi performa.

## Cara pakai (disarankan)
1. Buat project Expo TypeScript baru:
   ```bash
   npx create-expo-app rn-notes --template
   # Pilih: Blank (TypeScript)
   cd rn-notes
   ```
2. Install dependency:
   ```bash
   npm i @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs @reduxjs/toolkit react-redux redux-persist @react-native-async-storage/async-storage
   ```
3. Salin isi folder `src/`, `App.tsx`, dan `tsconfig.json` dari paket ini ke project Anda (replace jika ditanya).
4. Jalankan:
   ```bash
   npx expo start
   ```

> Catatan: Jika Anda ingin build release, gunakan `npx expo run:android --variant release` atau `npx expo run:ios --configuration Release`.
