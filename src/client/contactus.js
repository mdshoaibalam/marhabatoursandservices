import React, { Component } from 'react';
 
  
import ReactImage from './react.png';

export default class ContactUs extends Component {
 

  componentDidMount() {
 
  }

  render() {
     
    return (
      <div>
         <div>
        <div id="fh5co-contact" className="fh5co-section-gray">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 text-center heading-section animate-box">
                <h3>Contact Information</h3>
                <p>To know more about our services contact us anytime .Happy to help you !</p>
              </div>
            </div>
            <form action="#">
              <div className="row animate-box">
                <div className="col-md-6">
                  <h3 className="section-title">Our Address</h3>
                  <ul className="contact-info">
                    <li><i className="icon-location-pin" />61B, G.J. Khan Road, Ground Floor Prime Residency, C-Block Opposite Alam Tannery, Kolkata - 700 039 (W.B)</li>
                    <li><i className="icon-phone2" />+91 9830406589 / +91 9831162488 / +91 9831652207</li>
                    <li><i className="icon-mail" /><a href="#">marhaba5974@gmail.com</a></li>
                    <li><i className="icon-globe2" /><a href="#">www.marhabatoursandservices.com</a></li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input type="text" className="form-control" placeholder="Your Name" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input type="text" className="form-control" placeholder="Your Email" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <textarea className="form-control"  cols={30} rows={7} placeholder="Type your Query" defaultValue={""} />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <input type="submit" defaultValue="Send Message" className="btn btn-primary" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
         
        <div id="map" className="fh5co-map" />
      </div>
      </div>
    );
  }
}
