// import Head from "next/head";
// import Header from "@components/Header";
// import Footer from "@components/Footer";
// import Main from "@components/Main";
import React, { useState, useEffect } from "react";
// import { mineralsTemplatedFile } from "./../../../HistoricalListsOfAllLabels.jsonc";
export default function test() {
  // This really needs to be an endpoint that hits a nosql db. That would make it easy to add minerals quickly
  // Allow me to automatically incrment specimen id
  // Allow me to have a one click to localityIds (And sort localityIds by most used)
  // Automatically set the date of purchase
  // I could make it so it doesnt hit the backend and I have to copy paste the link myself... But thats a stop gap solution

  // const [data, setData] = useState([]);
  // let getDataFromFile = function () {
  //   // fetch(this.state.fileName);
  //   fetch(
  //     "/Users/goatfig/git/mineral-label-creator/public/HistoricalListsOfAllLabels.jsonc"
  //   )
  //     .then((response) => response.json())
  //     .then((dataMineralCollection) => {
  //       console.log("dataMineralCollection");
  //       console.log(dataMineralCollection);
  //       setData(dataMineralCollection);
  //       // this.setState({
  //       //   data: dataMineralCollection,
  //       // });
  //     });
  // };
  // useEffect(() => {
  //   getDataFromFile();
  // }, []);

  return (
    <>
      hello
      {/* {data} */}
      {/* <Main></Main> */}
      {/* <div>Hello</div> */}
    </>
    // <div className="container">
    //   <Head>
    //     <title>Next.js Starter!</title>
    //     <link rel="icon" href="/favicon.ico" />
    //   </Head>

    //   <main>
    //     <Header title="Welcome to my app!" />
    //     <p className="description">
    //       Get started by editing 123 <code>pages/index.js</code>
    //     </p>
    //   </main>

    //   <Footer />
    // </div>
  );
}
