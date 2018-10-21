import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Package.propTypes = {
//   name: React.PropTypes.string
// };
export default class NotFound extends Component {
    constructor() {
        super();
        this.isHide = true
        this.state = {
            orderList: []
        }
    }
    render() { 
        
        return (
            <div id="fh5co-tours" className="fh5co-section-gray">
                <div className="container">
                <div className="row">
                    <img src="src/client/images/404.jpg" style={{height:'325px'}} className="img-responsive" />
                    </div>
                </div>
            </div>
        );
    };


}
