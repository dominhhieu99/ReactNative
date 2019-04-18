import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,ScrollView
} from 'react-native';
import firebaseConf from '../helpers/firebase';

export default class DetailScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      item: this.props.navigation.getParam('data'),
      comments: [],
      name: "",
      nd: "",
    }
  }
  static navigationOptions = {
    title: 'Detail screen',
  };

  getCommentPosts(keyPost){
    var that = this;
    firebaseConf.database().ref('posts').child(keyPost).child('comment/').on('value', function (snapshot) {
      let comments = [];
      snapshot.forEach((child) => {

        let itemcmt = {
          keycmt: child.key,
          datacmt: child.val()
        }
        comments.push(itemcmt);
      });
      
      that.setState({comments});
    });
  }

  submitComment = () => {
    let datacmt = {
      name: "Hieu",
      nd: this.state.nd
    };
    var newCmtKey = firebaseConf.database().ref().child('posts').push().key;
    var addCmt = {};
    addCmt['/posts/'+ this.state.item.key +'/comment/' + newCmtKey] = datacmt;
    firebaseConf.database().ref().update(addCmt);
    alert('Comment thành công!');
    this.setState({
      nd: ''

    });


  }

  render() {
    const { navigation } = this.props;
    return (
      <ScrollView>

        <View style={styles.container}>

              <Text style={styles.textA}>{this.state.item.data.name}</Text>
              <Image source={{uri: `${this.state.item.data.image}`}} style={{width: 200, height: 150}}/>
              <Text style={styles.textB}>{this.state.item.data.short_desc}</Text>
              <Text style={styles.textC}>{this.state.item.data.content}</Text>

          <TouchableOpacity onPress={() => {this.getCommentPosts(this.state.item.key);}}>
          <Text style={[{width: 70}, styles.textA ]}>Binh Luan</Text>
          </TouchableOpacity>   

          {this.state.comments.map((cmt) =>
                <View style={{margin: 5}}>
                    <Text style={{fontWeight: "bold", fontSize: 15}}>Name: {cmt.datacmt.name}</Text>
                    <Text style={{fontWeight: "bold", fontSize: 15}}>{cmt.datacmt.nd}</Text>  
                </View>
          )}

            <Text style={styles.textA}>Viết bình luận</Text>

            <TextInput style={styles.txtInput} defaultValue={this.state.nd} 
                      onChangeText={(txt) => {this.setState({nd: txt})}} />

            <TouchableOpacity onPress={this.submitComment} style={styles.btn}>
              <Text style={styles.btnTxt}>Gửi</Text>
            </TouchableOpacity>
                  
        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent:'center',
    alignItems: 'center',
  },
  txtInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    height: 30,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    width: '90%',
    marginLeft: 20
  },
  btn:{
    backgroundColor: '#F0A52B',
    borderColor: '#ccc',
    borderWidth: 1,
    height: 30,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    width: '90%',
    marginLeft: 20
  },
  btnTxt: {
    fontWeight: 'bold',
    color: "#fff",
    fontSize: 22,
    textAlign: 'center'
  }
  ,textA:{
    fontSize: 20,
    fontWeight: 'bold',
    color:'#00796b',
    width: 350,
    margin:5,textAlign: 'auto'
  }
  ,textB:{
    fontSize: 16,
    fontWeight: 'bold',
    color:'#00796b',
    width: 350,
    margin:5,textAlign: 'auto',
    textAlignVertical: 'center'
  },
  textC:{
    fontSize: 14,
    fontWeight: 'bold',
    color:'#00796b',
    width: 350,
    margin:5,textAlign: 'auto',
    textAlignVertical: 'center'
  }
});