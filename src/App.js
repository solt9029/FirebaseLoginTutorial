import React, { Component } from 'react';
import './App.css';
import firebase, { auth, provider } from './firebase.js';

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
    auth.signInWithPopup(provider) 
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  }
  logout() {
    auth.signOut()
      .then(() => {
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
      <div className='app'>
        <header>
            <div className="wrapper">
              <h1>Memo</h1>
              {this.state.user ?
                <button onClick={this.logout}>Logout</button>                
              :
                <button onClick={this.login}>Log In</button>              
              }
            </div>
        </header>
        {this.state.user ?
          <div>
            <div className='user-profile'>
                <img src={this.state.user.photoURL} />
            </div>
            <div className='container'>
              <section className='add-item'>
                    <form onSubmit={this.handleSubmit}>
                      <input type="text" name="title" onChange={this.handleChange} value={this.state.title} placeholder="title" />
                      <input type="text" name="content" onChange={this.handleChange} value={this.state.content} placeholder="content" />
                      <button>Add Item</button>
                    </form>
              </section>

              <section className='display-item'>
                  <div className="wrapper">
                    <ul>
                      {this.state.items.map((item) => {
                        return (
                          <li key={item.id}>
                            <h3>{item.title}</h3>
                            <p>{item.content}
                              <button onClick={() => this.removeItem(item.id)}>Remove Item</button>
                            </p>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
              </section>
            </div>
          </div>
        : 
          <p>You must be logged in!</p>
        }
      </div>
    );
  }
}