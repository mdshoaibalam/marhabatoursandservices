import React, { Component } from 'react';
import axios from 'axios';


import PropTypes from 'prop-types';
// Package.propTypes = {
//   name: React.PropTypes.string
// };

export default class Order extends Component {
    constructor() {
        super();
        this.isHide = true
        this.state = {
            orderList: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/api/orders')
            .then(result => {
                this.setState({ orderList: result.data.orders });
            })
            .catch(err => console.log(err));
    }
 
    render() {
 
        const ListItem = this.state.orderList.map((item, index) => {

            return (
                index === 0 ? (
                    <div key={index}>
                        <div className="row" key={index}>
                            <div className="divTable">
                                <div className="divTableBody">
                                    <div className="divTableRow fontweight">
                                        <div className="divTableCell">Customer Name</div>
                                        <div className="divTableCell">Email</div>
                                        <div className="divTableCell">Mobile #</div>
                                        <div className="divTableCell">Package Name</div>
                                        <div className="divTableCell">Value</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div  className="row">
                            <div className="divTable">
                                <div className="divTableBody">
                                    <div className="divTableRow">
                                        <div className="divTableCell">{item.name}</div>
                                        <div className="divTableCell">{item.email}</div>
                                        <div className="divTableCell">{item.mobile}</div>
                                        <div className="divTableCell">{item.packageName}</div>
                                        <div className="divTableCell">{item.price}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                )
                    :
                    <div key={item.id} className="row">
                        <div className="divTable">
                            <div className="divTableBody">
                                <div className="divTableRow">
                                    <div className="divTableCell">{item.name}</div>
                                    <div className="divTableCell">{item.email}</div>
                                    <div className="divTableCell">{item.mobile}</div>
                                    <div className="divTableCell">{item.packageName}</div>
                                    <div className="divTableCell">{item.price}</div>
                                </div>
                            </div>
                        </div>
                    </div>

            )
        });
        return (
             
                <div className="container content-position">
                    {ListItem}
                </div>
             
        );
    };


}
