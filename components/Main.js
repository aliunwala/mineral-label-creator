// import "./styles"
import React from "react";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";

// import ReactDOM from 'react-dom'
// import CSVReader from 'react-csv-reader'
import Card from "./Card.js";
import CardBack from "./CardBack.js";
// import "./App.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Row,Col } from 'react-bootstrap';
import { mineralsTemplatedFile } from "./HistoricalListsOfAllLabels.js";
import { localityTemplatesFile } from "./templates_locality.js";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: "AU-template-short",
          minerals: ["", "", ""],
          locality: "",
          dateOfAcquisition: 2020,
          originalPurchasePriceUSD: 1,
        },
      ],
      mineralsTemplated: [],
      localityTemplates: [],
      printLabelBacksides: false,
      labelSize: "TN", //options: "" or TN
      fileName: "./mineralDatabase/minerals.json", // Usually "./mineralDatabase/minerals.json"
    };
  }

  componentDidMount() {
    // this.getDataFromFile(); // OLD Prob Should delete this line

    // This code combines the files mineralsTemplatedFile and localityTemplatesFile to make a final data variable to display
    let resultElem = [];
    mineralsTemplatedFile.forEach((elem) => {
      // console.log(elem)
      let localityTemplate = elem.localityTag;
      localityTemplatesFile.forEach((elem1) => {
        if (elem1.id == localityTemplate) {
          elem.locality = elem1.locality;
          elem.localityCountry = elem1.localityCountry;
          elem.localityName = elem1.localityName;
        }
      });
      resultElem.push(elem);
    });
    console.log("resultElem");
    console.log(resultElem);
    this.setState({ data: resultElem });
  }

  createCards() {
    let cards = [];
    if (this.state.data) {
      for (let i = 0; i < this.state.data.length; i++) {
        // console.log(this.state.data[i])
        let innerText = [];
        if (this.state.data[i].minerals === undefined) {
          continue;
        }
        innerText.push(
          <div className={"growTopCard" + this.state.labelSize}></div>
        );
        // Join all mineral names
        let allMineralsNames = this.capitalizeFirstLetter(
          this.state.data[i].minerals[0]
        );
        for (let j = 1; j < this.state.data[i].minerals.length; j++) {
          allMineralsNames =
            allMineralsNames +
            ", " +
            this.capitalizeFirstLetter(this.state.data[i].minerals[j]);
        }
        innerText.push(
          <p className={"cardText mineralName" + this.state.labelSize}>
            {allMineralsNames}
          </p>
        );
        if (this.state.labelSize == "TN") {
          innerText.push(
            <div className={"cardText mineralLocality" + this.state.labelSize}>
              {this.state.data[i].localityName +
                ", " +
                this.state.data[i].localityCountry}
            </div>
          );
        } else {
          innerText.push(
            <div className={"cardText mineralLocality" + this.state.labelSize}>
              {this.state.data[i].locality}
            </div>
          );
        }
        innerText.push(<div style={{ flexGrow: "1" }}></div>);
        innerText.push(
          <div className={"cardText collectionOwner" + this.state.labelSize}>
            Collection of Ali Unwala #{this.state.data[i].id}
          </div>
        );
        innerText.push(
          <div className={"cardText collectionOwner" + this.state.labelSize}>
            &nbsp;
          </div>
        ); // Added empty space at the bottom to raise the "collection of ali unwala text"
        cards.push(<Card labelSize={this.state.labelSize}>{innerText}</Card>);
      }
    }
    return cards;
  }
  createCardBacks() {
    let cards = [];
    if (this.state.data) {
      for (let i = 0; i < this.state.data.length; i++) {
        // console.log(this.state.data[i])
        let innerText = [];
        let mineralAcquisitionDateAndPriceText = (
          <>
            <strong>Acquired: </strong> in{" "}
            {this.state.data[i].dateOfAcquisition +
              " for $" +
              this.state.data[i].originalPurchasePriceUSD +
              "USD"}
          </>
        );
        let mineralIdText = (
          <>
            <strong>Specimen Number: </strong>
            {this.state.data[i].id}
          </>
        );
        let mineralNotesText = (
          <>
            <strong>Notes: </strong>
            {this.state.data[i].notes}
          </>
        );
        let mineralNotesTextForLength = "Notes: " + this.state.data[i].notes;

        if (
          this.state.data[i].notes == undefined ||
          this.state.data[i].notes == ""
        ) {
          innerText.push(
            <div
              className={"mineralId" + this.state.labelSize}
              style={{ fontSize: "16px" }}
            >
              {mineralIdText}
            </div>
          );
          innerText.push(
            <div className={"mineralNotes" + this.state.labelSize}>
              <strong>Notes: </strong>None recorded
            </div>
          );
          innerText.push(
            <div
              className={
                "mineralAcquisitionDateAndPrice" + this.state.labelSize
              }
              style={{ fontSize: "16px" }}
            >
              {mineralAcquisitionDateAndPriceText}
            </div>
          );
        } else {
          if (mineralNotesTextForLength.length < 575) {
            // If the notes are "short" then set the font to 16px
            innerText.push(
              <div
                className={"mineralId" + this.state.labelSize}
                style={{ fontSize: "16px" }}
              >
                {mineralIdText}
              </div>
            );
            innerText.push(
              <div
                className={"mineralNotes" + this.state.labelSize}
                style={{ fontSize: "16px" }}
              >
                {mineralNotesText}
              </div>
            );
            innerText.push(
              <div
                className={
                  "mineralAcquisitionDateAndPrice" + this.state.labelSize
                }
                style={{ fontSize: "16px" }}
              >
                {mineralAcquisitionDateAndPriceText}
              </div>
            );
          } else if (mineralNotesTextForLength.length < 850) {
            // If the notes are "medium" then set the font to 13px
            innerText.push(
              <div
                className={"mineralId" + this.state.labelSize}
                style={{ fontSize: "13px" }}
              >
                {mineralIdText}
              </div>
            );
            innerText.push(
              <div
                className={"mineralNotes" + this.state.labelSize}
                style={{ fontSize: "13px" }}
              >
                {mineralNotesText}
              </div>
            );
            innerText.push(
              <div
                className={
                  "mineralAcquisitionDateAndPrice" + this.state.labelSize
                }
                style={{ fontSize: "13px" }}
              >
                {mineralAcquisitionDateAndPriceText}
              </div>
            );
          }
          // else if(mineralNotesTextForLength.length < 1180){   // If the notes are "long" then set the font to 11px
          //     innerText.push(<div className="mineralId" style={{fontSize:"11px"}}>{mineralIdText}</div>)
          //     innerText.push(<div className="mineralNotes" style={{fontSize:"11px"}}>{mineralNotesText}</div>)
          //     innerText.push(<div className="mineralAcquisitionDateAndPrice" style={{fontSize:"11px"}}>{mineralAcquisitionDateAndPriceText}</div>)
          // }
          else {
            // If the notes are "too long to fit" then set the font to 11 and add "... more details in the database"
            innerText.push(
              <div
                className={"mineralId" + this.state.labelSize}
                style={{ fontSize: "11px" }}
              >
                {mineralIdText}
              </div>
            );
            innerText.push(
              <div
                className={"mineralNotes" + this.state.labelSize}
                style={{ fontSize: "11px" }}
              >
                <strong>Notes: </strong>
                {this.state.data[i].notes.substring(0, 850) +
                  "... more details in the database"}
              </div>
            );
            innerText.push(
              <div
                className={
                  "mineralAcquisitionDateAndPrice" + this.state.labelSize
                }
                style={{ fontSize: "11px" }}
              >
                {mineralAcquisitionDateAndPriceText}
              </div>
            );
          }
        }

        // innerText.push(<div className="cardText mineralLocality">{this.state.data[i].notes}</div>)

        // innerText.push(<div style={{flexGrow:"1"}}></div>)
        // // Join all mineral names
        // let allMineralsNames = this.capitalizeFirstLetter(this.state.data[i].minerals[0]);
        // for (let j = 1; j < this.state.data[i].minerals.length; j++) {
        //     allMineralsNames = allMineralsNames + ", " + this.capitalizeFirstLetter(this.state.data[i].minerals[j])
        // }
        // innerText.push(<p className="cardText mineralName">{allMineralsNames}</p>)
        // innerText.push(<div className="cardText mineralLocality">{this.state.data[i].locality}</div>)
        // innerText.push(<div style={{flexGrow:"1"}}></div>)
        // innerText.push(<div className="cardText collectionOwner">Collection of Ali Unwala</div>)
        cards.push(
          <CardBack labelSize={this.state.labelSize}>{innerText}</CardBack>
        );
      }
    }
    return cards;
  }

  structureCardsDEPRECATED() {
    let cards = this.createCards();
    let cardBacks = this.createCardBacks();
    let cardsPerPage = 10;
    let pages = [];
    while (cards.length > 0) {
      // let currentPage = []
      let leftHalf = [];
      let rightHalf = [];
      let leftHalfCardBacks = [];
      let rightHalfCardBacks = [];
      for (let i = 0; i < cardsPerPage; i++) {
        // currentPage.push(cards.pop())
        if (i < cardsPerPage / 2) {
          leftHalf.push(cards.pop());
        } else {
          rightHalf.push(cards.pop());
        }
      }
      for (let i = 0; i < cardsPerPage; i++) {
        // currentPage.push(cards.pop())
        if (i < cardsPerPage / 2) {
          rightHalfCardBacks.push(cardBacks.pop());
        } else {
          leftHalfCardBacks.push(cardBacks.pop());
        }
      }
      pages.push(
        <div id="singlePage">
          <div className="flexContainer">
            <div>
              <div>{leftHalf}</div>
            </div>
            <div>
              <div>{rightHalf}</div>
            </div>
          </div>
        </div>
      );

      if (this.state.printLabelBacksides) {
        pages.push(
          <div id="singlePage">
            <div className="flexContainer">
              <div>
                <div style={{ disply: "flex", justifyContent: "center" }}>
                  {leftHalfCardBacks}
                </div>
              </div>
              <div>
                <div>{rightHalfCardBacks}</div>
              </div>
            </div>
          </div>
        );
      }
    }

    return pages;
  }

  structureCardsTN() {
    let cards = this.createCards();
    let cardBacks = this.createCardBacks();
    let cardsPerPage = 50;
    let cardsPerColumn = 8;
    let pages = [];

    // console.log("----------------------")

    while (cards.length > 0) {
      let rows = [];
      for (let j = 0; j < 5; j++) {
        let row = [];
        for (let i = 0; i < cardsPerColumn; i++) {
          if (cards.length >= 1) {
            if (i == 0) {
              row.push(<div className="firstRow">{cards.pop()}</div>);
            } else {
              row.push(cards.pop());
            }
          }
        }
        rows[j] = row;
      }

      // console.log(cards.length)
      // console.log(rows)

      pages.push(
        <div id="singlePage">
          <div className="flexContainer">
            <div>
              <div className="firstCol">{rows[0]}</div>
            </div>
            <div>
              <div>{rows[1]}</div>
            </div>
            <div>
              <div>{rows[2]}</div>
            </div>
            <div>
              <div>{rows[3]}</div>
            </div>
            <div>
              <div>{rows[4]}</div>
            </div>
          </div>
        </div>
      );
    }
    return pages;
  }

  structureCards() {
    let cards = this.createCards();
    let cardBacks = this.createCardBacks();
    let cardsPerPage = 50;
    let cardsPerColumn = 7;
    let numberOfColumn = 2;
    let pages = [];

    // console.log("----------------------")

    while (cards.length > 0) {
      let rows = [];
      for (let j = 0; j < numberOfColumn; j++) {
        let row = [];
        for (let i = 0; i < cardsPerColumn; i++) {
          if (cards.length >= 1) {
            if (i == 0) {
              row.push(<div className="firstRow">{cards.pop()}</div>);
            } else {
              row.push(cards.pop());
            }
          }
        }
        rows[j] = row;
      }

      // console.log(cards.length)
      // console.log(rows)

      pages.push(
        <div id="singlePage">
          <div className="flexContainer">
            <div>
              <div className="firstCol">{rows[0]}</div>
            </div>
            <div>
              <div>{rows[1]}</div>
            </div>
            <div>
              <div>{rows[2]}</div>
            </div>
            <div>
              <div>{rows[3]}</div>
            </div>
            {/* <div>
                            <div>
                                {rows[4]}
                            </div>
                        </div> */}
          </div>
        </div>
      );
    }
    return pages;
  }

  chooseCardStructure() {
    if (this.state.labelSize == "TN") {
      return this.structureCardsTN();
    } else {
      return this.structureCards();
    }
  }

  getDataFromFile() {
    fetch(this.state.fileName)
      .then((response) => response.json())
      .then((dataMineralCollection) => {
        this.setState({
          data: dataMineralCollection,
        });
      });
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    return <>{this.chooseCardStructure()}</>;
  }
}

export default Main;
