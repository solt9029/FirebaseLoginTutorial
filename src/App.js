import React, { Component } from 'react';
import firebase, { auth, provider } from './firebase/index';
import { Container, Row, Col } from 'reactstrap';
import LoginNavbar from './LoginNavbar';
import UserNavbar from './UserNavbar';
import MemoForm from './MemoForm';
import MemoList from './MemoList';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      content: '',
      items: [],
      user: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  login() {
    auth.signInWithPopup(provider).then((result) => {
      const user = result.user;
      this.setState({
        user: user
      });
    });
  }
  logout() {
    auth.signOut().then(() => {
      this.setState({
        user: null
      });
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const userRef = firebase.database().ref(this.state.user.uid);
    const item = {
      title: this.state.title,
      content: this.state.content
    }
    userRef.push(item);
    this.setState({
      title: '',
      content: ''
    });
  }
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        return;
      }
      this.setState({ user });
      const userRef = firebase.database().ref(this.state.user.uid);
      userRef.on('value', (snapshot) => {
        let value = snapshot.val(); // 取得したデータ
        let items = [];
        for (let id in value) {
          items.push({
            id: id,
            title: value[id].title,
            content: value[id].content
          });
        }
        this.setState({
          items: items
        });
      });
    });
  }
  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/${this.state.user.uid}/${itemId}`);
    itemRef.remove();
  }
  render() {
    return (
      <div>
      {
        this.state.user ? 
        <div>
          <UserNavbar user={this.state.user} logout={this.logout} />
          <Container>
            <Row>
              <Col sm={12}>
                <MemoForm handleSubmit={this.handleSubmit} handleChange={this.handleChange} title={this.state.title} content={this.state.content} />
                <MemoList items={this.state.items} removeItem={this.removeItem} />
              </Col>
            </Row>
          </Container>
        </div>
        :
        <LoginNavbar login={this.login} />
      }
      </div>
    );
  }
}