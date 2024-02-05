import { useNode } from "@craftjs/core";
import { Box, Flex } from "components/Grid";
import { CountdownSettings } from "./CountdownSettings";
import moment from "moment";
import { Counter } from "components/Counter";
import _includes from "lodash/includes";

export const Countdown = ({ children, date, single, ...style }) => {
  const {
    connectors: { connect },
  } = useNode();

  return (
    <div ref={connect}>
      <Counter target={date}>
        {({ diff }) => {
          const duration = moment.duration(diff);
          // if (duration.milliseconds() < 0 || duration.seconds() < 0) {
          //   return null;
          // }
          return (
            <Flex justifyContent="center">
              <Flex
                sx={{
                  "> div": {
                    textAlign: "center",
                    px: 2,
                    lineHeight: 1,
                    ".title": {
                      p: 2,
                      fontSize: [5, 6],
                      color: "text",
                    },
                    ".subtitle": {
                      fontSize: [1, 2],
                      color: "lighterText",
                    },
                  },
                }}
              >
                {_includes(["", "days"], single) && (
                  <div>
                    <div className="title">
                      {duration.days() < 0 ? 0 : parseInt(duration.asDays())}
                    </div>
                    <div className="subtitle">Days</div>
                  </div>
                )}
                {_includes(["", "hours"], single) && (
                  <div>
                    <div className="title">
                      {duration.hours() < 0 ? 0 : duration.hours()}
                    </div>
                    <div className="subtitle">Hours</div>
                  </div>
                )}
                {_includes(["", "minutes"], single) && (
                  <div>
                    <div className="title">
                      {duration.minutes() < 0 ? 0 : duration.minutes()}
                    </div>
                    <div className="subtitle">Minutes</div>
                  </div>
                )}
                {_includes(["", "seconds"], single) && (
                  <div>
                    <div className="title">
                      {duration.seconds() < 0 ? 0 : duration.seconds()}
                    </div>
                    <div className="subtitle">Seconds</div>
                  </div>
                )}
              </Flex>
            </Flex>
          );
        }}
      </Counter>
    </div>
  );
};

Countdown.craft = {
  name: "Countdown",
  props: {
    date: moment().add(15, "day").toISOString(),
    single: "", // days, hours, minutes, seconds
  },
  related: {
    settings: CountdownSettings,
  },
};
