import React, { Component } from 'react';
import axios from 'axios';
import { createHashHistory } from 'history'
 
import PropTypes  from 'prop-types';
// Package.propTypes = {
//   name: React.PropTypes.string
// };

const history = createHashHistory();
export default class Package extends Component {
  constructor(){
    super();
    this.isHide=true
    this.state = {
      packageList:[]
    }
  }

  changetheworld(){
    this.isHide = !this.isHide;
    this.flag = this.isHide ? 'show' :'hide';
    console.log('clickingg...'+ this.flag)
  //  $('#clickMe').show();
  }
  componentDidMount() {
    axios.get('http://localhost:4000/api/packages')
      .then(result => {
        this.setState({packageList:result.data[0].packages});
      })
      .catch(err=>console.log(err));
  }
  navigatePageDetails(id){
    
    history.push(`/package-details/${id}`)
  }

  render() {
    let ListItem=  this.state.packageList.map((item)=>{ 
      return (
      <div key={item._id} className="col-md-4 col-sm-6 fh5co-tours animate-box" data-animate-effect="fadeIn">
      <div href="#"><img style={{height:'201px'}} src={ item.packageImage && 'uploads'+ item.packageImage.split('uploads')[1]} alt="No Image available" className="img-responsive" />
        <div className="desc">
          <span />
           
          <h3>{item.packageName}</h3>
          <span>for {item.duration} days</span>
          <span className="price">&#8377; {item.price}</span>
          <a className="btn btn-primary btn-outline" onClick={this.navigatePageDetails.bind(this,item._id)}>Book Now <i className="icon-arrow-right22" />
        
          </a>
        </div>
      </div>
    </div>
    )
    });
    return (
      
     
      
      <div>
          <div id="fh5co-tours" className="fh5co-section-gray">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 text-center heading-section animate-box">
              <h3>Hajj & Umrah packegs for you </h3>
              <p>Nabi (saw) has stated in a hadith: ‘The performance of Hajj and Umrah increase a person’s life span and eradicates poverty and sins just as rust is removed from the iron when placed in the furnace.’ (Targhib)</p>
            </div>
          </div>
        
          <div className="row row-bottom-padded-md">
         
           
        {ListItem}
      
          </div> 
        </div>
      </div>
      </div>
    
      
    );
  };

 
}
