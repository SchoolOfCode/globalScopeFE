import React, { useEffect, useState } from "react";
import Layout from "../Layout";
// import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
// import { ChakraProvider } from "@chakra-ui/react";
import { PolarArea, Bar, Line } from "react-chartjs-2";
import { useUser } from "../App/App.js";
import GaugeChart from "react-gauge-chart";

export default function StatisticsPage() {
  const [confidence, setConfidence] = useState(1);
  const [feelings, setFeelings] = useState(1);
  const [refDateOne, setRefDateOne] = useState(0);
  const [refDateTwo, setRefDateTwo] = useState(0);
  const [refDateThree, setRefDateThree] = useState(0);
  const [refDateFour, setRefDateFour] = useState(0);
  const [refDateFive, setRefDateFive] = useState(0);
  const user = useUser();
  useEffect(() => {
    fetch(`https://global-scope.herokuapp.com/reflections/${user.bootcamperid}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.payload[0].confidence)
        const overallConfidence = data.payload.map(
          (reflection) => reflection.confidence
        );
        // console.log(overallConfidence)

        const feeling = data.payload.map(
          (reflections) => reflections.overallfeeling
        );
        //  console.log(feeling)

        const emojiReducer = feeling.reduce((a, c) => a + c);
        const averageFeeling = emojiReducer / feeling.length;
        // console.log(averageFeeling)
        setFeelings(averageFeeling);

        const reducer = overallConfidence.reduce((a, c) => a + c);
        // console.log(reducer)
        const averageConfidence = reducer / overallConfidence.length;
        // console.log(averageConfidence)
        setConfidence(averageConfidence);
        // setHighlightedDays(dates)

        const recentFeelings = data.payload
          .map((reflections) => reflections.overallfeeling)
          .reverse();

        console.log(recentFeelings[4]);
        setRefDateOne(recentFeelings[4]);
        setRefDateTwo(recentFeelings[3]);
        setRefDateThree(recentFeelings[2]);
        setRefDateFour(recentFeelings[1]);
        setRefDateFive(recentFeelings[0]);
      })

      .catch((err) => console.log(err));
  }, [user.bootcamperid]);

  const findDate = () => {
    const date1 = new Date(user.startdate);
    const date2 = new Date();
    const diffTime = Math.abs(date2 - date1);
    // console.log(diffTime)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    // console.log(diffDays)
    const progressBar = Math.floor((diffDays / 112) * 100);
    // console.log(progressBar)
    return progressBar;
  };
  let value = findDate();
  let progressPercentage = findDate() / 100;

  return (
    <Layout>
      <div className="py-4 px-2">
        <div className="grid grid-cols-3 px-10 gap-10">
          <div className="flex flex-col  items-center mt-5 pt-6 pb-10 bg-gray-100  h-3/5 rounded-b-xl   mt-4 shadow-inner ">
            {/* <ChakraProvider>
            <CircularProgress value={findDate()} size='125px' color='#401485'>
              <CircularProgressLabel> {value}%</CircularProgressLabel>
            </CircularProgress>
          </ChakraProvider> */}
            <GaugeChart
              id="gauge-chart3"
              nrOfLevels={20}
              colors={["rgba(153, 102, 255, 0.5)", "rgba(20, 220, 20, 0.7)"]}
              arcWidth={0.35}
              percent={progressPercentage}
              textColor={"#464A4F"}
              style={{ width: "120%" }}
              needleBaseColor={"#401485"}
              needleColor={"rgba(153, 102, 255, 0.5)"}
              hideText={true}
            />
            <p>{value}%</p>
          </div>
          <div className="flex flex-col justify-center items-center pt-6 pb-10 bg-gray-100 w-3/4 h-3/4 rounded-b-xl  mx-auto mt-4 shadow-inner ">
            {/* <ChakraProvider>
            <CircularProgress value={100} size='125px' color='green'>
              <CircularProgressLabel> 5</CircularProgressLabel>
            </CircularProgress>
          </ChakraProvider> */}
            <GaugeChart
              id="gauge-chart2"
              nrOfLevels={6}
              arcWidth={0.3}
              percent={(Math.round(feelings) * 1.67 - 1) / 10}
              colors={["rgba(255, 206, 86, 0.7)", "rgba(255, 180, 0, 0.9)"]}
              style={{ width: "120%" }}
              needleBaseColor={"#401485"}
              needleColor={"rgba(153, 102, 255, 0.5)"}
              hideText={true}
            />

            <img
              className="h-1/5"
              src={`/images/emojis/${Math.round(`${feelings}`)}.png`}
              alt="emoji face"
            />
          </div>
          <div className="flex flex-col justify-center justify-self-end items-center  pt-6 pb-10 bg-gray-100 w-3/4 h-3/4 rounded-b-xl  mt-4 shadow-inner ">
            {/* <ChakraProvider>
            <CircularProgress value={25} size='125px' color='red'>
              <CircularProgressLabel> 1.8%</CircularProgressLabel>
            </CircularProgress>
          </ChakraProvider> */}
            <GaugeChart
              id="gauge-chart1"
              percent={(Math.round(confidence) * 2 - 1) / 10}
              nrOfLevels={5}
              arcWidth={0.3}
              style={{ width: "120%" }}
              needleBaseColor={"#401485"}
              needleColor={"rgba(153, 102, 255, 0.5)"}
              hideText={true}
              colors={[
                "rgba(255, 99, 132, 0.8)",
                "rgba(255, 206, 86, 0.8)",
                "rgba(20, 220, 20, 0.7)",
              ]}
            />
            <p>{Math.round(confidence)}</p>
          </div>
        </div>

        <div className="px-10 grid grid-cols-2 gap-10   ">
          <div className=" bg-gray-100 rounded-l-xl  drop-shadow-2xl  shadow-inner">
            <PolarArea
              data={{
                labels: ["😭", "🙁", "😐", "🤔", "😀", "🤩 "],
                datasets: [
                  {
                    label: "Overall mood",
                    fill: true,
                    data: [10, 1, 10, 4, 2, 1],
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.5)",
                      "rgba(54, 162, 235, 0.5)",
                      "rgba(255, 206, 86, 0.5)",
                      "rgba(75, 192, 192, 0.5)",
                      "rgba(153, 102, 255, 0.5)",
                      "rgba(255, 159, 64, 0.5)",
                    ],

                    borderWidth: 3,
                  },
                  // {
                  //   label: 'Quantity',
                  //   data: [47, 52, 67, 58, 9, 50],
                  //   backgroundColor: 'orange',
                  //   borderColor: 'red',
                  // },
                ],
              }}
              height={400}
              width={600}
              options={{
                maintainAspectRatio: false,

                scales: {
                  yAxes: [
                    {
                      ticks: {
                        beginAtZero: true,
                      },
                    },
                  ],
                },
                legend: {
                  labels: {
                    fontSize: 50,
                  },
                },
              }}
            />
          </div>
          <div className=" bg-gray-100 rounded-r-xl z-10 shadow-inner">
            <Line
              data={{
                labels: ["Oldest", "", "", "", "Newest"],
                datasets: [
                  {
                    label: "Confidence level",
                    data: [
                      `${refDateOne}`,
                      `${refDateTwo}`,
                      `${refDateThree}`,
                      `${refDateFour}`,
                      `${refDateFive}`,
                    ],
                    backgroundColor: ["rgba(255, 159, 64, 0.5)"],
                    borderColor: ["white"],
                    borderWidth: 3,
                    fill: true,
                  },
                  // {
                  //   label: 'Quantity',
                  //   data: [47, 52, 67, 58, 9, 50],
                  //   backgroundColor: 'orange',
                  //   borderColor: 'red',
                  // },
                ],
              }}
              height={400}
              width={600}
              options={{
                maintainAspectRatio: false,
                scaleOverride : true,
                scales: {
                  
                  y: {
                    ticks: {
                      beginAtZero: true,
                      type: "linear",
                      min: 0,
                      max: 6,
                      stepSize: 1,
                      offset: true,
                      callback: (value) => {
                        if (value === 1) {
                          return `😭`;
                        }
                        if (value === 2) {
                          return `🙁`;
                        }
                        if (value === 3) {
                          return `😐`;
                        }
                        if (value === 4) {
                          return `🤔`;
                        }
                        if (value === 5) {
                          return `😀`;
                        }
                        if (value === 6) {
                          return `🤩`;
                        }
                      },
                    },
                  },
                },
                legend: {
                  labels: {
                    fontSize: 50,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
