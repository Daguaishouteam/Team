import {Input, InputNumber, message } from 'antd';
import React from 'react';
import PropTypes from "prop-types";

const Search = Input.Search;

export class City extends React.Component {

  state= {
    city: localStorage.getItem("city"),
    days: Number(localStorage.getItem("days")),
  };

  //the method begin from here
  static contextTypes = {
    router: PropTypes.object
  }
  constructor(props, context) {
    super(props, context);
  }

  //this method is not safe in the future!!!
  handleSearch = (value) => {
    value = value.split(" ").join("");
    console.log(value);
    if (!value) {
      message.error("Please input your dream city!");
    } else {
      localStorage.days = Number(this.state.days);
      localStorage.city = value.toUpperCase();
      this.context.router.history.push("/plan");
    }
  }

  onChange = (value) => {
    this.setState({days:value,},() => {
      console.log(this.state.value)
    });
  }


  render() {
    return(
      <div className='City'>
          <div className="City-Description"> <span>You want to have a </span>
            <span>
              <InputNumber className="City-Day" size="default" min={1} max={15} defaultValue={3} onChange={this.onChange} />
            </span> <span>days trip,</span>
            <div className="AND">
              AND
            </div>
            <div>Your dream city is:</div>
          </div>
      <Search
        placeholder="Input your dream city"
        enterButton="GO!"
        size="large"
        onSearch={this.handleSearch}
      />
      </div>
    );
  }
}
