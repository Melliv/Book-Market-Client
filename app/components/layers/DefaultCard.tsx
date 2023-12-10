"use client"
import { selectTheme } from "@/app/store/reducers/theme";
import { useSelector } from "react-redux";

const DefaultCard = ({ children }: any) => {
  const isLightTheme = useSelector(selectTheme)

  return (
    <div className="flex justify-center md:mt-4 lg:mt-8">
      <div className={"max-w-sm p-6 rounded-lg shadow " + (isLightTheme ? "light-theme" : "dark-theme")}>
        {children}
      </div>
    </div>
  )
}

export default DefaultCard;
