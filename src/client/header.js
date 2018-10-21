import React, { Component } from 'react';
import { Link } from 'react-router-dom';
  
import ReactImage from './react.png';

export default class Footer extends Component {
 

  componentDidMount() {
 
  }

  render() {
		 
		const isAccessableLink = 1==1 ? <li><Link to={'/orders'}>Orders</Link></li> : '';
    return (
		 
     
         <header id="fh5co-header-section" className="sticky-banner">
			<div className="container">
				<div className="nav-header">
					<a href="#" className="js-fh5co-nav-toggle fh5co-nav-toggle dark"><i></i></a>
					{/* <h1 id="fh5co-logo"><a href="index.html"><i className="icon-airplane"></i>Marhaba Travels</a></h1> */}
				 
					<nav id="fh5co-menu-wrap" role="navigation">
						<ul className="sf-menu" id="fh5co-primary-menu">
							<li><Link to={'/home'}>Home</Link></li>
							<li><Link to={'/packages'}>package</Link></li>
							<li><Link to={'/ourservice'}>Our Service</Link></li>								
							<li><Link to={'/gallery'}>Gallery</Link></li>
							<li><Link to={'/contact'}>contact</Link></li>
							{isAccessableLink}
						</ul>
					</nav>
				</div>
			</div>
		</header> 
       
		 
    );
  }
}
