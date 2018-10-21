import React, { Component } from 'react';
import axios,{post } from 'axios';
import moment from 'moment';
import ModalTemplate from './modal-template';
import './app.css'; 


const _features = ["Airlines Tickets","Umrah Visa.","Hotel Accommodations Near to Harmain Sharifain", "Buffet Breakfast,Lunch & inner", "Ziarat at Holy Places in Makkah Al Mokarrama & Madinah Al Munawwara.","Gifts & Complements for Every Pilgrim"]
export default class CreatePackage extends Component {

    constructor(){
   super();
   this.state = {
    form:{        
        packageName: '',
        price: '',
        packageImage: new FormData(),
        features: _features,
        currency:'INR',
        startDate:'',
        endDate:'',
        duration:'',
      }
      
   }
  
    
 }

 savePackage(){     
    var a = moment(this.state.form.startDate, 'YYYY-MM-DD');
    var b = moment(this.state.form.endDate, 'YYYY-MM-DD');
    var days = b.diff(a, 'days');
    
     
     
    const data = new FormData();
    data.append('packageName',this.state.form.packageName);
    data.append('price',this.state.form.price);
    this.state.form.features.map((item,index)=>{
        data.append('features['+index+']',item);
    });
    data.append('packageImage',this.state.form.packageImage);
    data.append('startDate',this.state.form.startDate);
    data.append('endDate',this.state.form.endDate);
    data.append('duration',days)
    axios.post(`http://localhost:4000/api/packages`,data,{
        headers: {
            'Content-Type': undefined,
        }
    })
    .then(result=>{         
      alert('Package has been sucessfully created');
    })
    .catch(e=>console.log(e));
 }

 handleChange(e){    
    if(e.target.value === 'All'){
      localStorage.setItem('features');
    }
    
  }
 onChange(event){
    this.state.form[event.target.name] = event.target.value;
  
    this.setState({form: this.state.form});
   }
  componentDidMount() {
    // axios.get(`http://localhost:4000/api/packages/${this.props.match.params.id}`)
    // .then(result=>{
    //   console.log(result);
    //  this.setState({resultData: result.data});
    // })
    // .catch(e=>console.log(e));
  }
  handleUploadFile(event){ 
    this.state.form[event.target.name] = event.target.files[0]
    this.setState({form: this.state.form});
  }
  render() {
     
    return (
      <div>
       <div id="fh5co-tours" className="fh5co-section-gray">
        <div className="container">
          <div className="row">
            <div className="col-md-12 animate-box">


             <form name="addPackage" >
        
             <div className="col-md-12">
							<div className="row">
								<div className="col-md-6">
									<div className="form-group">
										<input type="text" className="form-control" placeholder="Package Name" name="packageName" value={this.state.form.packageName}
                    onChange={this.onChange.bind(this)} />
									</div>
								</div>
								<div className="col-md-6">
									<div className="form-group">
										<input type="text" className="form-control" placeholder="Price of Package" name="price" value={this.state.form.price}
                    onChange={this.onChange.bind(this)}/>
									</div>
								</div>

                <div className="col-md-6">
									<div className="form-group">
										<input type="date" className="form-control" placeholder="Start Date" name="startDate" value={this.state.form.startDate}
                    onChange={this.onChange.bind(this)} />
									</div>
								</div>
								<div className="col-md-6">
									<div className="form-group">
										<input type="date" className="form-control" placeholder="End Date" name="endDate" value={this.state.form.endDate}
                    onChange={this.onChange.bind(this)}  />
									</div>
								</div>
								<div className="col-md-12">
									<div className="form-group">
										<input type="file" className="form-control" name="packageImage"
                    onChange={this.handleUploadFile.bind(this)} />
									</div>
								</div>
                
                
				<div className="col-md-12"> 
                  <ul>
                      {this.state.form.features.map((item,index)=>{
                        return ( <li key={index} style={{cursor:'move',listStyle:'none'}}>{item}</li>)
                      })
                      }
                      </ul>								 
								</div>          
               
                <div className="col-md-8">
                <button type="button" className="btn btn-primary" onClick={this.savePackage.bind(this)}>Save</button>

                    </div>
							</div>
						</div>
   
      
            </form>



            </div>          
          
          </div>
        </div>
      </div>
      </div>
    
      
    );
  }
}
