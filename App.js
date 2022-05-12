import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import nfcManager, { NfcEvents, NfcTech } from 'react-native-nfc-manager';

export default function App() {
  const [nfcData, setNfcData] = useState();
  async function getNFCInfo() {
    try {
      nfcManager.registerTagEvent();
      
      await nfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await nfcManager.getTag();
      setNfcData(tag);
    }
    catch (ex){
      console.error('exception', ex)
    }
    finally {
      nfcManager.unregisterTagEvent();
      nfcManager.cancelTechnologyRequest();
    }
  }

  useEffect(() => {
    nfcManager.isSupported().then(supported => {
      if (supported) {
        nfcManager.start();
      } else {
        setNfcData('NFC not supported');
      }
    })
  }, [])

  useEffect(() => {
    getNFCInfo();
  }, [nfcData])

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
