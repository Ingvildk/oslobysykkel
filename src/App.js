import React from 'react';
import './App.css';
import { getData} from './utils/getBicycleData';
import styled from "styled-components";

const ApplicationWrapper = styled.div`
  border-style: solid;
  display: flex;
  flex-direction: column;
`;

const ElementWrapper =  styled.p`
    width: 20%
`;

const StationWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

export default class OsloBySykkel extends React.Component {

  constructor(props){
      super(props);
      this.state = {
      }
  }

  componentDidMount() {
      setInterval(() => {
          getData().then(res => {
            this.setState({sykkelData: res})})},
          10000)

    getData().then(res => {
        this.setState({sykkelData: res})});
  }


  render() {
      let bicycleData;
      if (this.state.sykkelData) {
          let count = 0;
              bicycleData = this.state.sykkelData.map(data => {
                  count++;
                  return (<StationWrapper>
                      <ElementWrapper key={count}>{data.address}</ElementWrapper>
                      <ElementWrapper key={count}>{data.docks}</ElementWrapper>
                      <ElementWrapper key={count}>{data.available}</ElementWrapper>
                  </StationWrapper>);
              });
      }
    return (
        <ApplicationWrapper>
          <StationWrapper>
            <ElementWrapper>Address</ElementWrapper>
            <ElementWrapper>Docks</ElementWrapper>
            <ElementWrapper>Available bikes</ElementWrapper>
          </StationWrapper>
            {bicycleData}
        </ApplicationWrapper>
    );
  }
}

