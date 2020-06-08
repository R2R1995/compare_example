import React, { Component } from "react";
import { Container, Row, Col, Table } from "reactstrap";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.css";
import Axios from "axios";
import isEmpty from "lodash/isEmpty";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      comparTable: [],
      fetch: false,
    };
    this.handleCompare = this.handleCompare.bind(this);
  }
  componentDidMount() {
    Axios.get("http://dummy.restapiexample.com/api/v1/employees")
      .then((response) => {
        const data = response.data.data;
        this.setState({
          user: data,
          fetch: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  handleCompare(e) {
    const id = e.target.getAttribute("data-id");
    let { comparTable } = this.state;
    let idSelected = id;
    if (!isEmpty(comparTable)) {
      const findCompareId = comparTable.filter((item) => {
        return item.id === id;
      });
      idSelected = isEmpty(findCompareId) ? id : null;
    }
    if (!isEmpty(idSelected)) {
      const temp = this.state.user.filter((item) => {
        return item.id === idSelected;
      });
      if(comparTable.length < 3)
      comparTable.push(temp[0]);
      this.setState({
        comparTable: comparTable,
      });
    }
  }
  render() {
    const { user, fetch, comparTable } = this.state;
    return (
      <Container className="App">
        <div className="package-box">
          <Row>
            {fetch
              ? user.map((item) => {
                  return (
                    <Col sm="6" md="3" className="box-item" key={item.id}>
                      <div className="box-item_wrapper">
                        <div className="img-holder">
                          <img
                            src={
                              item.id % 2 === 0
                                ? "data:image/jpeg;base64,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"
                                : "https://www.biography.com/.image/ar_8:10%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cg_faces:center%2Cq_auto:good%2Cw_620/MTcyMzE0MzI2NTU0NjQ5ODEy/ang-lee-gettyimages-163118045.jpg"
                            }
                            alt={item.employee_name}
                          />
                          <div className="compare-button">
                          <button
                            data-id={item.id}
                            onClick={this.handleCompare}
                          >
                            compare
                          </button>
                        </div>
                        </div>
                        <div className="details-holder">
                          <Row>
                            <Col sm="6">
                              <div className="title-box">
                                <h5>{item.employee_name}</h5>
                              </div>
                              <div className="summary-box">
                                <span>{item.employee_age} years old</span>
                              </div>
                            </Col>
                            <Col sm="6">
                              <div className="price-box">
                                <span>{item.employee_salary} $</span>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </Col>
                  );
                })
              : null}
          </Row>
          {!isEmpty(comparTable) ? (
            <Table>
              <tbody>
                <tr>
                  <th/>
                  {
                    comparTable.map((item) => {return(
                      <td key={item.employee_name}>{item.employee_name}</td>
                    )})
                  }
                </tr>
                <tr>
                  <th>
                    Age
                  </th>
                {
                    comparTable.map((item) => {return(
                      <td key={item.employee_age}>{item.employee_age}</td>
                    )})
                  }
                </tr>
                <tr>
                  <th>
                    Salary
                  </th>
                  {
                    comparTable.map((item) => {return(
                      <td key={item.employee_salary}>{item.employee_salary}$</td>
                    )})
                  }
                </tr>
              </tbody>
            </Table>
          ) : null}
        </div>
      </Container>
    );
  }
}
