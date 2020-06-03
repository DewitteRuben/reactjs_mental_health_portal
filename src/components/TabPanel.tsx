import React from "react";

interface ITabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const TabPanel: React.FC<ITabPanelProps> = ({
  children,
  value,
  index,
  ...other
}) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`wrapped-tabpanel-${index}`}
    aria-labelledby={`wrapped-tab-${index}`}
    {...other}
  >
    {value === index && <div>{children}</div>}
  </div>
);

export default TabPanel;
