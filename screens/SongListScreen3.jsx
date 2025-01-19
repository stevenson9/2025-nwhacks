import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

const RecordVideoScreen = ({navigation}) => {
    const fetchUserLikedSongs = async () => {
        try {
            const user = JSON.parse(await AsyncStorage.getItem('user'))
            // no !== null
            try {
                const response = await axios.get('https://api.spotify.com/v1/me/tracks?offset=0&limit=50', {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`
                    }
                })

                let data = response.data
                //console.log("Total liked songs: " + data.total)

                let songs = []

                for(let i = 0; i < data.items.length; i++) {
                    let song = data.items[i].track
                    songs.push({
                        id: song.id,
                        img: song.album.images[1].url,
                        name: song.name,
                        url: song.external_urls.spotify,
                    })
                }
                //console.log(songs) // log all pulled songs

                let next = data.next
                let counter = 1
                while(next !== null) {
                    try {
                        const response = await axios.get(next, {
                            headers: {
                                Authorization: `Bearer ${user.accessToken}`
                            }
                        })

                        let data = response.data
                        for(let i = 0; i < data.items.length; i++) {
                            let song = data.items[i].track
                            songs.push({
                                id: song.id,
                                img: song.album.images[1].url,
                                name: song.name,
                                url: song.external_urls.spotify,
                                uri: song.uri
                            })
                        }
                        console.log("Iteration", ++counter) // count iterations for testing
                        next = data.next
                    } catch(err) {

                    }
                }

                // save liked songs into storage
                try {
                    await AsyncStorage.setItem(
                        'songs',
                        JSON.stringify(songs)
                    );
                    console.log("Songs saved into storage!")
                } catch (error) {
                    // Error saving data
                    console.error('Error saving data', error)
                }

            } catch(err) {
                console.error('request error', err)
            }
        } catch(err) {
            console.error('storage error', err)
        }

    }
    
    return (
      <View style={styles.container}>
        <Text style={styles.title} onPress={() => { fetchUserLikedSongs()
          /*navigation.navigate("Login");*/
        }}>Back to login, temp songlist screen.</Text>
        <View>
        <Button title="Next" onPress={() => {
          
        }}/>
        </View>
        
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#F8F0FB",
    },
  
    button: {
      color: "black",
      backgroundColor: "#8075FF",
    }
  });
  
  export default RecordVideoScreen;
  