import React from 'react';
import {
  Layout, Breadcrumb, Button, Input, InputNumber, List, Spin, message, Avatar
} from 'antd';
import {Link} from "react-router-dom";
import reqwest from "reqwest";
import InfiniteScroll from 'react-infinite-scroller';
import {MyListItem} from "./MyListItem";
import { PlanMap } from "./PlanMap";
import { GET_GEO, GOOGLE_MAP_KEY, TEXT_SEARCH} from './constants';
import {ResultList} from "./ResultList"

const Search = Input.Search;
const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';
let tmpData = {
  name: undefined,
  lat: undefined,
  lng: undefined,
  id: undefined
};


  export class Plan extends React.Component {

  state={
    city: localStorage.getItem("city"),
    days: Number(localStorage.getItem("days")),
    currentDay: 1,
    data: Array.from(new Array((Number(localStorage.getItem("days"))+1))),
    currentData: [],
    currentSearch: [],
    isInitMap: false,
    initList: true,
    loading: false,
    hasMore: true,
    isSearched: false,
    zeroResult: false,
  }

  getLatLon = (address) => {
    fetch(`${GET_GEO}address=${address}&key=${GOOGLE_MAP_KEY}`,{
      method: 'GET',
      mode: 'cors',
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        }
        throw new Error(response.statusText);
      })
      .then((response) => {
        return(JSON.parse(response).results[0].geometry.location);
      })
      .then((response) => {
        let lan = response.lat;
        let lng = response.lng;
        console.log("getLocation",lan,lng);
      })
  }

    componentDidMount() {
    if (this.state.initList) {
      this.setState({initList: false},() => {
        console.log(this.state.initList);
      });
    }
    this.setState({isInitMap : true}, () => {
      console.log("isInitMap", this.state.isInitMap)
    });
  }

  handleInfiniteOnLoad = () => {
    this.setState({
      loading: true,
    });
    console.log("InfiniteOnLoad",this.state);
  }

  onChange = (value) => {
    if (value > this.state.days) {return null};
    console.log("onChange_value",value);
    let tempData = this.state.data;
    tempData[this.state.currentDay] = this.state.currentData;
    console.log("tempData",tempData);
    this.setState({data: tempData},
      ()=>{console.log("update_Data",console.log(this.state.data))})
    this.setState({currentDay: Number(value),},() => {
      console.log("currentDay",this.state.currentDay);
    });
    this.setState({currentData: tempData[value]},
      ()=>{console.log("onChange_currentData", this.state.currentData)})
  }

  handleAdd = () => {
    if (this.state.currentSearch.length==0) {
      return null;
    }
    tmpData = [{
      name: this.state.currentSearch.formatted_address,
      lat: this.state.currentSearch.geometry.location.lat,
      lng: this.state.currentSearch.geometry.location.lng,
      id: this.state.currentSearch.id
    }]
    let tempData=this.state.currentData;
    if (tempData == undefined ) {
      tempData = tmpData
    } else {
      tempData = [...tempData,...tmpData];
    }
    console.log("Temp and tmp", tempData, tmpData);
    this.setState({currentData: tempData},
      ()=>{console.log("currentData",this.state.currentData)});
    this.handleInfiniteOnLoad();
  }

  handleUp = (key) => {
    console.log("handleUp",key);
    return null;
  }

  handleDelete = () => {
    console.log("handleDel");
    return null;
  }

  handleSearch = (value) => {
    value = value.split(" ").join("+");
    // value = value.split("+").join("%2B");
    // console.log("handleSearch",value);
    console.log(TEXT_SEARCH,"query=",value,"&key=",GOOGLE_MAP_KEY);
    fetch(`${TEXT_SEARCH}query=${value}+${localStorage.getItem("city")}&key=${GOOGLE_MAP_KEY}`,{
      method: 'GET',
      mode: 'cors',
    })
      .then((response) => {
        if (response.ok) {
          if (!this.state.isSearched) {
            this.setState({isSearched: true}, () => {console.log("isSearched",this.state.isSearched)});
          }
          return response.text();
        }
        throw new Error(response.statusText);
      })
      .then((response) => {
        response = JSON.parse(response);
        if (response.status=="ZERO_RESULTS") {
          this.setState({zeroResult: true},
            ()=>{console.log("zeroResult:",this.state.zeroResult)});
        } else {
          this.setState({zeroResult: false},
            ()=>{console.log("zeroResult:",this.state.zeroResult)});
        }
        return response;
      })
      .then((response) => {
        if (response.status=="OK") {
          this.setState({currentSearch: response.results[0]},
            ()=>{console.log("currentSearch",this.state.currentSearch);})
        }
        }
      )
      .catch((e) => {
        throw new Error(e);
        }
      )
  }

  saveTrip = () => {
    this.onChange(this.state.currentDay);
    this.props.saveTrip(this.state.data);
  }

  render() {
    const {
      Content, Footer, Sider,
    } = Layout;
    console.log("render",this.state);

    return(
      <Layout className='Plan'>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb className='PlanBreadcrumb' style={{ margin: '16px 0' }}>
            <Breadcrumb.Item><Link to="/city">City Search</Link></Breadcrumb.Item>
            <Breadcrumb.Item>Manage Plan</Breadcrumb.Item>
          </Breadcrumb>
          <Layout className='ShowContent' style={{  background: '#fff'}}>
            <Sider className="firstPlan" width={350} style={{ background: '#e1e1ea' }} >
              <div className="Plan-Description">You will have a trip at {this.state.city}</div>
              <div className="Plan-Description">for {this.state.days} days.</div>
              <div className="Plan-Prefix">
                <div className="Plan-Prefix-Search">
                  SEARCH and ADD your places of interests!
                </div>
                  <Search
                    placeholder="places of interests"
                    onSearch={this.handleSearch}
                    style={{ width: 300 }}
                  />
                <div className="Plan-Prefix-Search">
                  <Button type="primary" className="Add-Btn" onClick={this.handleAdd}>
                    Add
                  </Button> <span className="Plan-Day-Trip">to Day</span>
                  <InputNumber size="default" style={{width: 60}} min={1} max={Number(localStorage.getItem("days"))} defaultValue={1} onChange={this.onChange} />
                </div>

              </div>
              { this.state.isSearched ? (
                (this.state.zeroResult) ?
                  (<div> No available Result! </div>)
                  :
                  (<div className="Result-List">
                    <ResultList dataSource={this.state.currentSearch}/>
                  </div>)
                )
                :
                <div>No Search yet, Please search the place you are interested!</div>
              }
            </Sider>
            <Sider width={350} style={{ margin: '0 2px', background: '#e1e1ea' }} >
              <div className="Day-List">
                <InfiniteScroll
                  initialLoad={false}
                  pageStart={0}
                  loadMore={this.handleInfiniteOnLoad}
                  hasMore={!this.state.loading && this.state.hasMore}
                  useWindow={false}
                >
                  <List
                    dataSource={this.state.currentData}
                    renderItem={item => (
                      <MyListItem item={item} handleUp={this.handleUp} handleDelete={this.handleDelete}/>
                    )}
                  >
                  </List>
                </InfiniteScroll>
              </div>
              <div className="Next-Btn-Box">
                <Button type="primary" className="Next-Btn" onClick={this.saveTrip}>
                  <Link to='/show'>Build Your Plan!</Link>
                </Button>
              </div>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <div className="Map-Container">
                {this.state.isInitMap ? (<PlanMap
                  googleMapURL= {"https://maps.googleapis.com/maps/api/js?key="+GOOGLE_MAP_KEY+"&v=3.exp&libraries=geometry,drawing,places"}
                  isMarkerShown = {true}
                  lat={this.lat}
                  lng={this.lng}
                />) : null}
              </div>
            </Content>
          </Layout>
        </Content>
        <Footer className='ShowFooter' style={{ textAlign: 'center' }}>
          Plan Your Trip @DaguaishouTeam
        </Footer>
      </Layout>
    );
  }
}
