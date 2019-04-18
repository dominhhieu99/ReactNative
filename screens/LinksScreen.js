import React from 'react';
import {ScrollView, Text, TextInput, StyleSheet,
        Picker, TouchableOpacity} from 'react-native';
import firebaseConf from '../helpers/firebase';
export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Thêm bài viết',
  };

  constructor(props){
    super(props);
    this.state = {
      title: "",
      category: 2,
      image: "",
      short_desc: "",
      content: "",
      listCates: []
    }
  }

  componentDidMount = () => {
    var that = this;
    firebaseConf.database().ref('categories/').on('value', function (snapshot) {
      let cates = [];
      snapshot.forEach((child) => {
        let item = {
          key: child.key,
          data: child.val()
        }
        cates.push(item);
      });
      that.setState({listCates: cates});
    });
  }
  
  submitPost = () => {
    let data = {
      name: this.state.title,
      category: this.state.category,
      image: this.state.image,
      short_desc: this.state.short_desc,
      content: this.state.content
    };
    if (this.state.title=='') {
      alert('Không được bỏ trống Tiêu đề')
    }else if(this.state.image==''){
      alert('Không được bỏ trống Đường dẫn ảnh')
    }else if(this.state.short_desc==''){
      alert('Không được bỏ trống Mô Tả')
    }else if(this.state.content==''){
      alert('Không được bỏ trống Nội Dung')
    }else {
      var newPostKey = firebaseConf.database().ref().child('posts').push().key;
    var updates = {};
    updates['/posts/' + newPostKey] = data;
    firebaseConf.database().ref().update(updates);
    alert('Tạo mới bài viết thành công!');
    this.setState({
      title: '',
      category: 0,
      image: '',
      short_desc: '',
      content: ''
    });
    }
  }

  render() {
    return (
      <ScrollView>
        <Text style={styles.label}>Tiêu đề bài viết</Text>
        <TextInput 
          style={styles.txtInput}
          defaultValue={this.state.title}
          onChangeText={txt => {this.setState({title: txt})}} />
          
        <Text style={styles.label}>Danh mục</Text>
        <Picker selectedValue={this.state.category}
            onValueChange={(val) => {this.setState({category: val})}}>
          {this.state.listCates.map((item) => 
            <Picker.Item key={item.key} label={item.data.name} value={item.key}/>  
          )}
        </Picker>
        <Text style={styles.label}>Đường dẫn ảnh</Text>
        <TextInput 
          style={styles.txtInput}
          defaultValue={this.state.image}
          onChangeText={(txt) => {this.setState({image: txt})}} />
        <Text style={styles.label}>Mô tả ngắn</Text>
        <TextInput 
          style={[styles.txtInput, styles.txtarea]}
          multiline={true}
          defaultValue={this.state.short_desc}
          onChangeText={(txt) => {this.setState({short_desc: txt})}} />
        <Text style={styles.label}>Nội dung bài viêt</Text>
        <TextInput 
          style={[styles.txtInput, styles.txtarea]}
          multiline={true}
          defaultValue={this.state.content}
          onChangeText={(txt) => {this.setState({content: txt})}} />
        <TouchableOpacity 
          onPress={this.submitPost}
          style={styles.btn}>
          <Text style={styles.btnTxt}>Lưu</Text>
        </TouchableOpacity>
      </ScrollView>

    )
  }
}
const styles = StyleSheet.create({
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
  label:{
    marginLeft: 20,
    fontWeight: 'bold',
    marginTop: 10
  },
  txtarea:{
    height: 100
  },
  btn:{
    backgroundColor: '#F0A52B',
    marginTop: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnTxt: {
    fontWeight: 'bold',
    color: "#fff",
    fontSize: 22
  }

});