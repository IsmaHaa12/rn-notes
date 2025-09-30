# React Native Notes (Futuristic UI — Source Pack)
Aplikasi catatan dengan **UI futuristik** (dark + neon), **Navigation (Tabs + Stack)**, **Redux Toolkit + Persist**, dan optimasi performa.

## Dependency
- `@react-navigation/native`, `@react-navigation/native-stack`, `@react-navigation/bottom-tabs`
- `@reduxjs/toolkit`, `react-redux`, `redux-persist`, `@react-native-async-storage/async-storage`
- `expo-linear-gradient` (background gradien)
- `@expo/vector-icons` (ikon tab & tombol) — sudah termasuk di Expo
- `expo-status-bar` (sudah termasuk template Expo)

## Cara pakai (sumber kode ini)
1. Buat project Expo TypeScript baru:
   ```bash
   npx create-expo-app rn-notes --template
   # Pilih: Blank (TypeScript)
   cd rn-notes
   ```
2. Install dependency utama:
   ```bash
   npm i @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs @reduxjs/toolkit react-redux redux-persist @react-native-async-storage/async-storage
   npx expo install expo-linear-gradient
   ```
3. Salin berkas dari paket ini: `src/`, `App.tsx`, `tsconfig.json` -> ke project Anda (replace jika ditanya).
4. Jalankan:
   ```bash
   npx expo start
   ```

## Kustom warna
Ubah file `src/theme.ts` untuk menyesuaikan warna neon & kontras.

Selamat ngoding! 🚀
