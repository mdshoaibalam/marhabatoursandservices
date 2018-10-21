import React, { Component } from 'react';
import axios from 'axios';
  
export default class ModalTemplate extends Component {
 constructor(props){
   super();
  this.state = {
      isVisible:props.flag,
      flag:'fade hide',
      price: props.price, 
      packageId: props.packageId,
      packageName: props.packageName,   
      selectedValue:0,
      totalAmount:0,
      form:{        
        firstName:'',
        lastName:'',
        mobile:'',
        address: '',
        email:'',
        pincode:'',
        noOfRoom:'',
        city: ''
      }
  }
   
 }
 componentWillUpdate(){
    console.log('called')
 }
 showModal(){
     this.isVisible = !this.isVisible;
    this.setState({
        flag:this.isVisible ?'show' :'fade hide',
        price:this.props.price
    });
 }

 handleChange(e){
   this.setState({totalAmount:(parseInt(this.state.price)/parseInt(e.target.value)).toFixed(2)});
   this.state.form[e.target.name] = e.target.value;
   this.setState({form: this.state.form});
 }

 onChange(event){
  this.state.form[event.target.name] = event.target.value;
  this.setState({form: this.state.form});
 }
  
 bookOrder(event){
  event.preventDefault();
        console.log(this.state.form);
let params = {
  ...this.state.form,
      price: this.state.totalAmount,
      packageId: this.props.packageId,
      packageName: this.props.packageName
};
 axios.post(`http://localhost:4000/api/orders`,params)
    .then(result=>{
      console.log(result);
      this.showModal();
      alert('Your booking has been sucessfully placed , we will get back to you shortly');
    })
    .catch(e=>console.log(e));
 
 }
  
  render() {
     
    return (
        <div>
      <div  style={{padding:'10px'}}>
        <button className="btn btn-success btn-md" onClick={this.showModal.bind(this)}>Continue</button>
        <div style={{background:'rgba(255, 141, 0, 0.24)'}} className={`modal modal-backdrop ${this.state.flag}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" onClick={this.showModal.bind(this)} data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">Booking Details</h4>
            </div>
            <div className="modal-body">
            <div className="col-md-12">
							<div className="row">
								<div className="col-md-6">
									<div className="form-group">
										<input type="text" className="form-control" placeholder="First Name" name="firstName" value={this.state.form.firstName}
                    onChange={this.onChange.bind(this)} />
									</div>
								</div>
								<div className="col-md-6">
									<div className="form-group">
										<input type="text" className="form-control" placeholder="Last Name" name="lastName" value={this.state.form.lastName}
                    onChange={this.onChange.bind(this)}/>
									</div>
								</div>

                <div className="col-md-6">
									<div className="form-group">
										<input type="number" className="form-control" placeholder="Mobile #" name="mobile" value={this.state.form.mobile}
                    onChange={this.onChange.bind(this)} />
									</div>
								</div>
								<div className="col-md-6">
									<div className="form-group">
										<input type="email" className="form-control" placeholder="Email" name="email" value={this.state.form.email}
                    onChange={this.onChange.bind(this)}  />
									</div>
								</div>
								<div className="col-md-12">
									<div className="form-group">
										<textarea name="" className="form-control" id="" cols="30" rows="7" placeholder="Full Address" name="address" value={this.state.form.address}
                    onChange={this.onChange.bind(this)} ></textarea>
									</div>
								</div>
                <div className="col-md-6">
									<div className="form-group">
										<input type="number" maxLength="6" className="form-control" placeholder="6 digit area pincode" name="pincode" value={this.state.form.pincode}
                    onChange={this.onChange.bind(this)}  />
									</div>
								</div>
								<div className="col-md-6">
									<div className="form-group">
										<input type="text" className="form-control" placeholder="City" name="city" value={this.state.form.city}
                    onChange={this.onChange.bind(this)}  />
									</div>
								</div>
                <div className="col-md-5">
                  <label> No. of Sharing(s) in Room </label>
                </div>
								<div className="col-md-3"> 
                  <select className="form-control" name="noOfRoom" value={this.state.form.noOfRoom} onChange={this.handleChange.bind(this)}>
                      <option defaultValue={this.state.selectedValue}>--select--</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      
                    </select>								 
								</div>          
                <div className="col-md-4">
                <div className="form-group">
                   &#8377;<label>{this.state.totalAmount}</label> 
                  </div>
                </div>
							</div>
						</div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" onClick={this.showModal.bind(this)} data-dismiss="modal">Cancel</button>
              <button type="submit" className="btn btn-primary" onClick={this.bookOrder.bind(this)}>Book Now</button>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
    
      
    );
  }
}
