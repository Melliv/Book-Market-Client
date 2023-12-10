import { Oval } from "react-loader-spinner";

export default function Loader() {

    return (
        <div className="flex justify-center mt-12">
            <Oval
                height={80}
                width={80}
                color="#fff"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#fff"
                strokeWidth={5}
                strokeWidthSecondary={5}

            />
        </div>

    )
}
