import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import useCMSCart from "@/customHooks/useCMSCart";
import { Cart } from "../Cart";
import useCMSOrder from "@/customHooks/useCMSOrder";
import CartItem from "../Cart/CartItem";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box className="min-h-40 flex items-center">{children}</Box>
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TabContent(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { cartContentful } = useCMSCart();
  const { orderContentful } = useCMSOrder();

  return (
    <Box sx={{ width: "100%", mt: 6, px: 3 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label={props.mycartText} {...a11yProps(0)} />
          <Tab label={props.mylastOrder} {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Cart
          items={cartContentful}
          emptycartMessage={props.emptyMessageCart}
          cartSummary={props.cartPageHome}
          {...props}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {orderContentful?.lineItems?.length > 0 ? (
          <div className="grid grid-cols-2 gap-6 p-4">
            {orderContentful.lineItems.map((item) => (
              <CartItem key={item.id} item={item} isLastOrder={true} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 w-full">
            {props.EmptyMessagelastOrder}
          </p>
        )}
      </CustomTabPanel>
    </Box>
  );
}
