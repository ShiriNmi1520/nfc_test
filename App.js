import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import nfcManager, { NfcEvents } from 'react-native-nfc-manager';

export default function App() {
  const [nfcData, setNfcData] = useState();

  useEffect(() => {
    nfcManager.isSupported().then(supported => {
      if (supported) {
        nfcManager.start();
        nfcManager.registerTagEvent();
      } else {
        setNfcData('NFC not supported');
      }
    })
  }, [])

  useEffect(() => {
    nfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
      setNfcData(tag);
    });
    nfcManager.setEventListener(NfcEvents.DiscoverBackgroundTag, tag => {
      setNfcData(tag);
    });
  }, [nfcManager])

  return (
    <View style={styles.container}>
      <Text>NFC Tag ID</Text>
      <Text>{nfcData?.id}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
