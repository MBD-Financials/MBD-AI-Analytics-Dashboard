import { createTheme } from '@mui/material';
import { ResponsivePie } from '@nivo/pie'
import { BarChartContainer } from 'Styles/BarChart/inde'

const NFTPieChart = ({ newData /* see data tab */ })=>{
    const theme = createTheme()
    // console.log(newData);
    // const data = [
    //     {
    //       id: "java",
    //       label: "java",
    //       value: 195,
    //       color: "hsl(90, 70%, 50%)"
    //     },
    //     {
    //       id: "erlang",
    //       label: "erlang",
    //       value: 419,
    //       color: "hsl(56, 70%, 50%)"
    //     },
    //     {
    //       id: "ruby",
    //       label: "ruby",
    //       value: 407,
    //       color: "hsl(103, 70%, 50%)"
    //     },
    //     {
    //       id: "haskell",
    //       label: "haskell",
    //       value: 474,
    //       color: "hsl(186, 70%, 50%)"
    //     },
    //     {
    //       id: "go",
    //       label: "go",
    //       value: 71,
    //       color: "hsl(104, 70%, 50%)"
    //     }
    //   ];
      const firstTenCollection = () => {
        const firstTenDailyCollection = newData.slice(0, 10);
        const copyOffirstTenDailyCollection = [...firstTenDailyCollection];
        let sum=0;
        sum= copyOffirstTenDailyCollection.reduce((acc,item)=>acc + item.metric_values.transfers.value, 0)
        const graphCollection = copyOffirstTenDailyCollection.map((item) => {
        //   console.log(item);
          return {
            id: item.metadata.collection_name,
            label:item.metadata.collection_name,
            value: `${((item.metric_values.transfers.value/ sum) * 100).toFixed(1)}`,
            color:item.metadata.thumbnail_palette[0]
          };
        });
        return graphCollection;
      };
      const data = firstTenCollection();
    return (
        <BarChartContainer>

        {/* <ResponsivePie
            data={data}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            theme={{
                axis: {
                  domain: {
                    line: {
                      stroke: theme.palette.secondary[200],
                    },
                  },
                  legend: {
                    text: {
                      fill: theme.palette.secondary[200],
                    },
                  },
                  ticks: {
                    line: {
                      stroke: theme.palette.secondary[200],
                      strokeWidth: 1,
                    },
                    text: {
                      fill: theme.palette.secondary[200],
                    },
                  },
                },
                legends: {
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
                tooltip: {
                  container: {
                    color: theme.palette.primary.main,
                  },
                },
              }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        0.2
                    ]
                ]
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        2
                    ]
                ]
            }}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            // fill={[
            //     {
            //         match: {
            //             id: 'ruby'
            //         },
            //         id: 'dots'
            //     },
            //     {
            //         match: {
            //             id: 'c'
            //         },
            //         id: 'dots'
            //     },
            //     {
            //         match: {
            //             id: 'go'
            //         },
            //         id: 'dots'
            //     },
            //     {
            //         match: {
            //             id: 'python'
            //         },
            //         id: 'dots'
            //     },
            //     {
            //         match: {
            //             id: 'scala'
            //         },
            //         id: 'lines'
            //     },
            //     {
            //         match: {
            //             id: 'lisp'
            //         },
            //         id: 'lines'
            //     },
            //     {
            //         match: {
            //             id: 'elixir'
            //         },
            //         id: 'lines'
            //     },
            //     {
            //         match: {
            //             id: 'javascript'
            //         },
            //         id: 'lines'
            //     }
            // ]}
            legends={[
                {
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 0,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: '#999',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000'
                            }
                        }
                    ]
                }
            ]}
        /> */}
        <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: theme.palette.secondary[200],
            },
          },
          legend: {
            text: {
              fill: theme.palette.secondary[200],
            },
          },
          ticks: {
            line: {
              stroke: theme.palette.secondary[200],
              strokeWidth: 1,
            },
            text: {
              fill: theme.palette.secondary[200],
            },
          },
        },
        legends: {
          text: {
            fill: theme.palette.secondary[200],
          },
        },
        tooltip: {
          container: {
            color: theme.palette.primary.main,
          },
        },
      }}
      innerRadius={0.5}
      arcLabelsTextColor="white"
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#fff"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
    //   arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
    />
        </BarChartContainer>

    )
}


export default NFTPieChart