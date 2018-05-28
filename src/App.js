import React, { Component } from 'react';
import firebase, { auth, provider } from './firebase/index';
import { Button, Navbar, NavbarBrand, Container, Row, Col, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, ListGroupItemProps } from 'reactstrap';
import LoginNavbar from './LoginNavbar';
import UserNavbar from './UserNavbar';
import MemoForm from './MemoForm';
import Memo from './Memo';

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
          this.state.user
          ? <UserNavbar user={this.state.user} logout={this.logout} />
          : <LoginNavbar login={this.login} />
        }
        <Container>
          <Row>
            <Col sm={12}>
              <MemoForm handleSubmit={this.handleSubmit} handleChange={this.handleChange} title={this.state.title} content={this.state.content} />
              <ListGroup>
                {this.state.items.map((item) => {
                  return (
                    <Memo item={item} />
                    // <ListGroupItem key={item.id}>
                    //   <ListGroupItemHeading>{item.title}</ListGroupItemHeading>
                    //   <ListGroupItemText>{item.content}</ListGroupItemText>
                    //   <button onClick={() => this.removeItem(item.id)}>Remove Item</button>
                    // </ListGroupItem>
                  )
                })}
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}