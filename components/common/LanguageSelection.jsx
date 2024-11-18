import { useState } from "react";
import Popover from "@mui/material/Popover";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { getLocale } from "../../utils";

export default function LanguageSelection(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.toString();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const languageChange = (url) => {
    const { locale } = getLocale(params?.slug, url);
    let path = "/" + (params?.slug ?? [""]).join("/");
    if (locale) {
      path = path.replace(`/${locale}`, url.length > 1 ? url : "");
    } else {
      path = `${url}${path}`;
    }
    if (!path) path = "/";
    router.push(searchQuery ? path + "?" + searchQuery : path);
    handleClose();
  };

  const { locale } = getLocale(params?.slug);
  const getLangIndex = props?.multilingual?.findIndex((item) =>
    item?.url?.includes(locale)
  );
  const langIndex = getLangIndex !== -1 ? getLangIndex : 0;

  return (
    <div data-sb-object-id={props.id}>
      <div
        data-sb-field-path={`${props.multilingual[langIndex].id}:title`}
        aria-describedby={id}
        onClick={handleClick}
        className="border-solid border-2 border-gray-500 text-sm font-medium px-1 cursor-pointer text-gray-700"
      >
        {props.multilingual[langIndex].title}
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {props.multilingual.map((item, index) => (
          <div
            data-sb-field-path={`${item.id}:title`}
            key={item.id}
            className={`text-sm font-medium px-2 p-1 ${
              index === langIndex ? "bg-slate-200" : "cursor-pointer"
            }`}
            onClick={() => index !== langIndex && languageChange(item.url)}
          >
            {item.title}
          </div>
        ))}
      </Popover>
    </div>
  );
}
