import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, ScrollView, TouchableOpacity } from 'react-native';

import AwesomeAlert from 'react-native-awesome-alerts';

export default class SettingsScreen extends React.Component {
  constructor(props){
    super(props);
    this.saveNew = this.saveNew.bind(this);
    this.getWeather = this.getWeather.bind(this);

    this.state = {
      weatherApiKey: "104f298a8d04f8f4c48d0553479b3b7e",
      cityWeatherApi: "http://api.openweathermap.org/data/2.5/weather?appid=104f298a8d04f8f4c48d0553479b3b7e&units=metric&q=",
      defaultCity: "hanoi",
      weatherObj: null,
      multiple: 1,
      username: 'thienth',
      email: 'thienth32@gmail.com',
      tmpid: "0",
      tmptitle: "",
      tmpimg: "",
      tmpshortDesc: "",
      posts: []
    };
  }

  componentDidMount() {
    var that = this;
    this.getWeather()
  }
  
  getWeather(){

    fetch(this.state.cityWeatherApi + this.state.defaultCity, {
      method: "GET"
    })
    .then((res) => res.json())
    .then(data => {
      // console.log(data);
      this.setState({weatherObj: data});
    })
  }
  

  saveNew(){
    console.log(this.state.tmpid, this.state.tmptitle,
      this.state.tmpimg, this.state.tmpshortDesc);
    let newPost = {
      id: this.state.tmpid,
      title: this.state.tmptitle,
      img: this.state.tmpimg,
      shortDesc: this.state.tmpshortDesc,
    };
    let tmpPosts = [...this.state.posts];
    tmpPosts.push(newPost);
    this.setState({
      posts: tmpPosts,
      tmpid: "0",
      tmptitle: "",
      tmpimg: "",
      tmpshortDesc: "",
    });
  }

  render() {
    var weatherOutput = <Text>Loading</Text>;
    if(this.state.weatherObj != null){
      weatherOutput = (
        <View>
          <Text>Thành phố: {this.state.weatherObj.name}, {this.state.weatherObj.sys.country}</Text>
          <Text>Nhiệt độ: {this.state.weatherObj.main.temp} độ C</Text>
          <Text>Độ ẩm: {this.state.weatherObj.main.humidity}%</Text>
          <Text>Tầm nhìn xa: {this.state.weatherObj.visibility/1000} km</Text>
        </View>
      );
    }
    
    return (
       <ScrollView style={{marginTop: 50}}>

          <TextInput
            value={this.state.defaultCity}
            onChangeText={txt => {this.setState({defaultCity : txt})}}
          />
          <TouchableOpacity
          style={styles.button}
          onPress={this.getWeather}
          >
            <Text>Tìm kiếm</Text>
          </TouchableOpacity>
          {weatherOutput}
          
         {this.state.posts.map(row => 
            <View key={row.key}>
              <Image source={{uri: row.data.image}} style={{width: 100, height: 100}}/>
              <Text>{row.data.name}</Text>
            </View>
          )}
       </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
});