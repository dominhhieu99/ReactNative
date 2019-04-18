import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TouchableHighlight,
} from 'react-native';
import firebaseConf from '../helpers/firebase';


export default class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.getListPosts = this.getListPosts.bind(this);
    this.removePost = this.removePost.bind(this);
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
      timelike:""
    }
  }

  static navigationOptions = {
    header: null,
  };
  componentDidMount = () => {
    this.getListPosts();
    this.getLikePost();
  }

  setModalVisible(visible, key) {
    this.setState({modalVisible: visible, keyRemove: key});
    var that = this;
    setTimeout(() => {
      that.setState({modalVisible: false});
    }, 10000);
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
    firebaseConf.database().ref('posts/').child('-LYgcBGDgS5-tzNUCk2V').child('like/').on('value', function (snapshot) {
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
      namelike: "Long",
      timelike: "11:30",

    };

    var newLikeKey = firebaseConf.database().ref().child('posts').push().key;
    var addLike = {};
    addLike['/posts/'+ key +'/like/' + newLikeKey] = datalike;
    firebaseConf.database().ref().update(addLike);
    alert('Like thành công!');
   
  }

  removePost(postKey){
    firebaseConf.database().ref('posts/${postKey}').remove();
    this.setState({modalVisible: false});
    alert('Xóa bài viết thành công!');
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

      return (
        <View style={{marginTop: 20, marginLeft: 5, marginRight: 5}}>
                {/* <Text style={{fontSize: 20, fontWeight: 'bold'}}>{this.state.item.data.name}</Text>
        <Image source={{uri: `${this.state.item.data.image}`}} 
            style={{width: 200, height: 150}}
        />
        <Text>{this.state.item.data.short_desc}</Text> */}
            {this.state.posts.map((po) => 
              <View key={po.key}>
                <TouchableOpacity
                onPress={() => {
                       this.detailPost(po);}}
                >
                <Text style={styles.postTitle}>{po.data.name}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                onPress={() => {
                  this.likePost(po.key);
                }}
                style={styles.removeBtn}
                >
                <Text style={styles.removeBtnLabel}>Like</Text>
                </TouchableOpacity>

                <Text>Số Like: {this.getLikeCount(po.data.like)}</Text>

              
                <TouchableOpacity style={styles.removeBtn}
                  onPress={() => {
                    this.setModalVisible(true, po.key);
                  }}>
                  <Text style={styles.removeBtnLabel}>Xóa</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.removeBtn}
                  onPress={() => {
                    this.updatePost(po);
                  }}>
                  <Text style={[{width: 70}, styles.removeBtnLabel ]}>Cập nhật</Text>
                </TouchableOpacity>

              </View>
              

            )}
              <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              }}>
              <View style={{ flex: 1, 
                              alignItems: 'center', 
                              justifyContent: 'center',  
                              backgroundColor: 'rgba(52, 52, 52, 0.1)'}}>
                <View style={{ width: 200, 
                                minHeight: 100,
                                backgroundColor: '#fff'}}>
                  
                  <Text>Xóa bài viết??</Text>
                  <Text>{this.state.keyRemove}</Text>
                  
                  <TouchableHighlight
                    onPress={() => {
                      this.removePost(this.state.keyRemove);
                    }}>
                    <Text>Yes</Text>
                  </TouchableHighlight>

                  <TouchableHighlight
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}>
                    <Text>No</Text>
                  </TouchableHighlight>

                </View>
              </View>
            </Modal>

            <TouchableHighlight
              onPress={() => {
                this.setModalVisible(true);
              }}>
              <Text>Show Modal</Text>
            </TouchableHighlight>




        </View>

        
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  postTitle:{
    fontSize: 25,
    color: '#EEA43B',
    marginTop: 20,
    fontWeight: 'bold'
  },
  removeBtn:{
    width: 70,
    height: 30,
    backgroundColor: 'green',
    paddingLeft: 5,
    paddingRight: 5,
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
    
  },
  removeBtnLabel:{
    lineHeight: 30,
    color: '#fff'
  }
});














