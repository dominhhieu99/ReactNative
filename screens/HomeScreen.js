import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  WebView,
  Modal,
  TouchableHighlight,
  ActivityIndicator,ScrollView,AppRegistry,
} from 'react-native';
import firebaseConf from '../helpers/firebase';
import AwesomeAlert from 'react-native-awesome-alerts';
export default class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.getListPosts = this.getListPosts.bind(this);
    this.updatePost = this.updatePost.bind(this);
    this.getLikePost = this.getLikePost.bind(this);
    this.getLikeCount = this.getLikeCount.bind(this);
    this.state ={
      posts: [],
      likes: [],
      countlike: "",
      modalVisible: false,
      selectedPost: null,
      keyRemove:"",
      namelike:"",
      timelike:"",
      showAlert: false,
      key: ""
    }
  }

  showAlert(a){
    this.setState({
      showAlert: true,
      key: a
    });
  };
 
  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };

  static navigationOptions = {
    header: null,
  }
  componentDidMount = () => {
    this.getListPosts();
    this.getLikePost();
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
    var that = this;
    setTimeout(() => {
      that.setState({modalVisible: false});
    }, 3000);
  }

  getListPosts(){
    var that = this;
    firebaseConf.database().ref('posts/').on('value', function (snapshot) {
      let posts = [];
      snapshot.forEach((child) => {

        let item = {
          key: child.key,
          data: child.val()
        }
        posts.push(item);
      });
      
      that.setState({posts});
    });
  }
  getLikePost(){
    var that = this;
    firebaseConf.database().ref('posts/').child('like/').on('value', function (snapshot) {
      let likes = [];
      snapshot.forEach((child) => {

        let itemlike = {
          keylike: child.key,
          datalike: child.val(),
        }
        
        likes.push(itemlike);
      });
      
      that.setState({likes,
        countlike: likes.length
      });
      
    });
  
  }
  likePost(key){
    let datalike = {
      namelike: "Hiếu",
      timelike: "10:10",

    };

    var newLikeKey = firebaseConf.database().ref().child('posts').push().key;
    var addLike = {};
    addLike['/posts/'+ key +'/like/' + newLikeKey] = datalike;
    firebaseConf.database().ref().update(addLike);
    alert('Like thành công!');
   
  }

  removePost(postKey){
    firebaseConf.database().ref(`posts/${postKey}`).remove();
    alert('Xóa thành công! ')
    
  }


  updatePost(data){
    // console.log(data);
    this.props.navigation.navigate('UpdatePost', {post: data});
  }

  detailPost(data1){
    this.props.navigation.navigate('Detail', {data: data1});
  }
  getLikeCount(postData){
    var length = 0;
    for( var key in postData ) {
        if( postData.hasOwnProperty(key) ) {
            ++length;
        }
    }
    return length;
  }
  render() {
    const {showAlert} = this.state;
    const {navigate} = this.props.navigation;

    return (
      <ScrollView>
      <View style={styles.container}>
        {this.state.posts.map(row => 

            <View key={row.key}>
              <TouchableOpacity onPress={() => navigate('Detail', {data: row})} >
              
               <View style={styles.khung}> 

               <Image source={{uri: row.data.image}} style={{width: 100, height: 100,
                marginTop: 5, marginLeft: 5, marginRight: 5, marginBottom: 5}}/>
              <View>
              <Text style={{color:'#00796b',fontSize: 20, fontWeight: 'bold',width: 280,margin:5,height:50}}>{row.data.name}</Text>
                    
              <View style={styles.khung1}> 
                <TouchableOpacity style={styles.removeBtn}
                  onPress={() => {
                    // this.removePost(row.key)
                     this.showAlert(row.key);
                     
                  }}>
                  <Text style={[{textAlign: "center" },styles.removeBtnLabel]}>Xóa</Text>

                </TouchableOpacity>
                  
                <TouchableOpacity style={styles.removeBtn}
                  onPress={() => {
                    this.updatePost(row)
                  }}>
                  <Text style={[{textAlign: "center" },styles.removeBtnLabel]}>Cập nhật</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => {
                  this.likePost(row.key);
                }}
                style={styles.removeBtn}>
                <Text style={[{textAlign: "center" },styles.removeBtnLabel]}>LIKE: {this.getLikeCount(row.data.like)}</Text>
                </TouchableOpacity>
                </View> 
                
              </View>

               </View>
               
              </TouchableOpacity>

              
            </View>

          )}
        
      </View>
      <AwesomeAlert
           show={showAlert}
           showProgress={false}
           title="Thông Báo"
           message="Bạn chắc chắn muốn xóa!"
           closeOnTouchOutside={true}
           closeOnHardwareBackPress={false}
           showCancelButton={true}
           showConfirmButton={true}
           cancelText="No, cancel"
           confirmText="Yes, delete it"
           confirmButtonColor="#DD6B55"
           onCancelPressed={() => {
             this.hideAlert();    
           }}
           onConfirmPressed={() => {
             this.removePost(this.state.key)
             this.hideAlert();    
            alert('Xóa thành công')
           }}key
         />   
      
      </ScrollView>

      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30, marginLeft: 5, marginRight: 5,
    flex: 1,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  removeBtn:{
    width: 75,
    height: 35,
    backgroundColor: '#76ffff',
    paddingTop: 5,
    marginBottom:8,
    marginLeft:8,
    marginRight:7,
    fontWeight: 'bold',
  },
  khung:{
    marginTop: 10, marginLeft: 5, marginRight: 5, marginBottom: 5,
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#00796b',
  },
  khung1:{
    flex: 1,
    flexDirection: 'row',
  },
  removeBtnLabel: {
    color:'red',fontSize: 16,
    fontWeight: 'bold'
  },
  postTitle:{
    fontSize: 25,
    color: '#EEA43B',
    marginTop: 20,
    fontWeight: 'bold'
  },
});
AppRegistry.registerComponent('App', () => App)
