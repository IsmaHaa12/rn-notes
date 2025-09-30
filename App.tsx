import React, { Suspense } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store';
import { Text } from 'react-native';

// Lazy load screens to reduce initial bundle
const NotesScreen = React.lazy(() => import('./src/screens/NotesScreen'));
const EditNoteScreen = React.lazy(() => import('./src/screens/EditNoteScreen'));

export type RootStackParamList = {
  Tabs: undefined;
  EditNote: { id?: string } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="All" options={{ title: 'All' }}>
        {() => <NotesScreen showPinnedOnly={false} />}
      </Tab.Screen>
      <Tab.Screen name="Pinned" options={{ title: 'Pinned' }}>
        {() => <NotesScreen showPinnedOnly={true} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer theme={DefaultTheme}>
          <Suspense fallback={<Text style={{ padding: 16 }}>Loading…</Text>}>
            <Stack.Navigator>
              <Stack.Screen name="Tabs" component={Tabs} options={{ title: 'Notes' }} />
              <Stack.Screen
                name="EditNote"
                component={EditNoteScreen}
                options={{ title: 'Edit Note' }}
              />
            </Stack.Navigator>
          </Suspense>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
