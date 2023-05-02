import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {
  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
      setContacts(data);
      }
    }
  }

  return (
    <View style={styles.container}>
      <FlatList 
        style={{marginTop: 40}}
        data={contacts}
        renderItem={({ item }) =>
        <View style={{flexDirection: "row"}}>
          <Text style={{fontSize: 16}}>{item.name}</Text>
          {
            item.phoneNumbers ?
            <Text>{item.phoneNumbers[0].number}</Text> :
            <Text>No number available</Text>
          }
        </View>
        }
        keyExtractor={(item, index) => index.toString()}
      />
      <Button title="Get Contacts" onPress={getContacts} />
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
