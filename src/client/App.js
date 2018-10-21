import React, { Component } from 'react';
import { BrowserRouter as Router, HashRouter, Switch, Route, Link } from 'react-router-dom';
import ReactImage from './react.png'; 
import Header from './header';
import Footer from './footer';
import Package from './package';
import PackageDetails from './package-details';
import ContactUs from './contactus';
import Order from './order-details';
import Home from './home';
import Gallery from './gallery';
import OurService from './ourservice';
import NotFound from './404';
import CreatePackage from './createpackage';

export default class App extends Component {
  state = { username: null };

  componentDidMount() {
   
  }

  render() {
    const { username } = this.state;
    return (
      <div>
        <HashRouter>
           <div> 
            <Header /> 
        <Switch>
                  <Route path="/home" component={Home} />
                  <Route path="/ourservice" component={OurService} />
                  <Route path='/packages' component={Package} />
                  <Route path='/package-details/:id' component={PackageDetails} />
                  <Route path='/contact' component={ContactUs} />
                  <Route path='/gallery' component={Gallery} />
                  <Route path='/orders' component={Order} />
                  <Route path='/addpackage' component={CreatePackage} />
                  <Route exact path='/' component={Home} />
                  <Route path='*' component={NotFound} />
                
         </Switch>
        <Footer />   
        </div> 
        </HashRouter>    
      </div>
    );
  }
}
