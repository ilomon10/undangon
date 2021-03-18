import TemplateOne from "./TemplateOne";
import TemplateTwo from "./TemplateTwo";

const Theme = ({ theme, ...props }) => {
  let Ret;
  switch (theme) {
    case "one":
      Ret = TemplateOne;
      break;
    case "two":
      Ret = TemplateTwo;
      break;
    default: Ret = TemplateOne;
  }
  return <Ret {...props} />
}

export default Theme;