import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

const MakePlaylistScreen = ({navigation}) => {
  const [displayName, setDisplayName] = useState('')

  const createPlaylist = async () => {
    console.log('START CREATE')
    try {
      const user = JSON.parse(await AsyncStorage.getItem('user'))
      //console.log('STORAGE ACCESS TOKEN', user.accessToken)
      //console.log('STORAGE USER ID', user.id)
      if(user !== null) {
        try {
          const response = await axios.post(`https://api.spotify.com/v1/users/${user.id}/playlists`, {
            "name": "Playlist by MOODIFY",
            "description": "Playlist by Moodify description",
            "public": false
          }, {
            headers: {
              'content-type': 'application/json',
              'Authorization': 'Bearer ' + user.accessToken
            }
          })

          let res = await response
          let data = await response.data
          console.log(res)
          console.log(data)
        } catch (err) {
          console.error('inside error'+ err)
        }
      }
    } catch(error) {
      console.error('outside err', error)
    }
  }
  
    return (
      <View style={styles.container}>
        <Text>{displayName}</Text>
        
        <Text style={styles.title} onPress={() => /*createPlaylist()*/
          navigation.navigate("SongList")
        }>Create a playlist.</Text>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F8F0FB",
    },

    title: {
      color: "#8075FF",
      fontWeight: "bold",
      fontSize: 30,
    }
  });
  
export default MakePlaylistScreen;
  