import React from 'react'
import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { BarChartContainer } from "Styles/BarChart/inde";
import { useGetSalesQuery } from "state/api";

function BarGraph({heading, data}) {
    const theme = useTheme();
    const { isLoading } = useGetSalesQuery();
  return (
    <BarChartContainer
        // backgroundColor={theme.palette.background.alt}
        // p="1rem 1rem 5rem 1rem"
        // borderRadius="0.55rem"
        // mt="40px"
        // height="80vh"
        // width= '100%'
        // border={`1px solid ${theme.palette.secondary[200]}`}
      >
        <Typography variant="h2" mb={3}>{heading}</Typography>
        {/* {if (collection.length === 0 || isLoading) return "Loading...";} */}
        {data.length === 0 || isLoading ? (
          <Typography variant="h6">Loading...</Typography>
        ) : (
          <ResponsiveBar
            data={data}
            keys={["volume"]}
            indexBy="collection"
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
            margin={{ top: 50, right: 130, bottom: 70, left: 100 }}
            padding={0.3}
            valueScale={{ type: "linear" }}
            indexScale={{ type: "band", round: true }}
            colors={{ scheme: "nivo" }}
            defs={[
              {
                id: "dots",
                type: "patternDots",
                background: "inherit",
                color: "#38bcb2",
                size: 4,
                padding: 1,
                stagger: true,
              },
              {
                id: "lines",
                type: "patternLines",
                background: "inherit",
                color: "#eed312",
                rotation: -45,
                lineWidth: 10,
                spacing: 20,
              },
            ]}
            fill={[
              {
                match: {
                  id: "fries",
                },
                id: "dots",
              },
              {
                match: {
                  id: "sandwich",
                },
                id: "lines",
              },
            ]}
            borderColor={{ theme: "background" }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 10,
              tickPadding: 5,
              tickRotation: 35,
              // legend: 'country',
              legendPosition: "middle",
              legendOffset: 32,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              // legend: 'food',
              legendPosition: "middle",
              legendOffset: -40,
            }}
            enableGridX={true}
            labelSkipWidth={14}
            labelSkipHeight={11}
            labelTextColor={{
              from: "color",
              modifiers: [["darker", "2.3"]],
            }}
            legends={[]}
            role="application"
            isFocusable={true}
            ariaLabel="Nivo bar chart demo"
            barAriaLabel={(e) =>
              e.id + ": " + e.formattedValue + " in country: " + e.indexValue
            }
          />
        )}
      </BarChartContainer>
  )
}

export default BarGraph