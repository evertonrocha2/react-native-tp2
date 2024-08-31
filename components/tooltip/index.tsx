import React from "react";
import { View } from "react-native";
import { Tooltip as PaperTooltip, TooltipProps } from "react-native-paper";

const Tooltip = ({ children, ...props }: TooltipProps) => {
  return (
    <View>
      <PaperTooltip {...props}>
        {React.isValidElement(children) ? children : <View>{children}</View>}
      </PaperTooltip>
    </View>
  );
};

export default Tooltip;
