import { IconButton, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { optionFrom1ToN, translatePrice } from "@/utils";
import { Select } from "@mui/joy";

const CartItem = ({
  item,
  updateItemQuantity,
  removeItem,
  isLastOrder,
  locale,
}) => {
  const quantity = item?.quantity || 1;
  const getOptions = optionFrom1ToN(
    item?.variant?.availability?.availableQuantity
  );
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md rounded-md my-2">
      <div className="flex items-center">
        <img
          className="w-16 h-16 object-cover rounded-md"
          src={item.image}
          alt={item.name}
          data-sb-object-id={item.imageId}
        />
        <div className="ml-4">
          <h2 className="text-lg font-semibold">{item.name}</h2>
          <p className="text-sm text-gray-600 line-clamp-1">
            {item.description}
          </p>
          {!isLastOrder ? (
            <div className="mt-2">
              {getOptions.length > 1 ? (
                <Select
                  color="primary"
                  placeholder="Quantity"
                  onChange={(event, newValue) => {
                    updateItemQuantity(item.id, newValue, item?.pricevalue);
                  }}
                  value={quantity}
                  className="w-28"
                >
                  {getOptions}
                </Select>
              ) : (
                <Typography color="error">Out of Stock</Typography>
              )}
            </div>
          ) : (
            <div>Quantity: {quantity}</div>
          )}
        </div>
      </div>
      <div className="text-right h-full flex flex-col">
        {!isLastOrder && (
          <div>
            <IconButton
              onClick={() => removeItem(item.id)}
              color="error"
              aria-label="delete"
            >
              <ClearIcon />
            </IconButton>
          </div>
        )}

        <p className="text-lg font-semibold mt-auto">
          {translatePrice(item?.price, locale)}
        </p>
      </div>
    </div>
  );
};
export default CartItem;
