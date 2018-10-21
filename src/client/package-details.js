import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import ModalTemplate from './modal-template';
import './app.css'; 
  
export default class PackageDetails extends Component {
 constructor(props){
   super(props);
   this.state = {
     resultData :{}
   }
 }
  test=[];
  componentDidMount() {
    axios.get(`http://localhost:4000/api/packages/${this.props.match.params.id}`)
    .then(result=>{
      console.log(result);
     this.setState({resultData: result.data});
    })
    .catch(e=>console.log(e));
  }

  render() {
     
    return (
      <div>
       <div id="fh5co-tours" className="fh5co-section-gray">
        <div className="container">
          <div className="row">
            <div className="col-md-12 animate-box">
              <h2 className="heading-title">{this.state.resultData.packageName}</h2>
              <h4><span>{moment(this.state.resultData.startDate).format('DD-MMM-YYYY')}</span> <span className="glyphicon glyphicon-transfer pad-LR-30"></span> <span>{moment(this.state.resultData.endDate).format('DD-MMM-YYYY')}</span> </h4>
              <h4>&#8377;<span>{this.state.resultData.price}</span></h4>
            </div>
            <div className="col-md-6 animate-box">
              <ul>
                  {this.state && this.state.resultData && this.state.resultData.features &&  this.state.resultData.features.map((item)=>{
                  return <li className="packageList" key={item}>{item}</li>
                })} 
                 </ul>
            </div>
            <div className="col-md-6 animate-box">
              <img className="img-responsive" src={this.state.resultData.packageImage && 'uploads'+ this.state.resultData.packageImage.split('uploads')[1]} alt="No Preview Available" />
            </div>
            <div className="col-md-12 animate-box">
            <ModalTemplate id="modal" flag={false} price={this.state.resultData && this.state.resultData.price} packageId={this.state.resultData && this.state.resultData._id} packageName={this.state.resultData && this.state.resultData.packageName} />
              </div>
          </div>
        </div>
      </div>
      </div>
    
      
    );
  }
}
