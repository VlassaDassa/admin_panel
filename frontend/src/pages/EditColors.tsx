import { useEffect, useState } from "react";

import ViewPort from "../components/EditColors/ViewPort/ViewPort";
import Title from "../components/general/Title/Title";
import Colors from "../components/EditColors/Colors/Colors";
import Loader from "../components/general/Loader/Loader";
import InfoSection from "../components/general/InfoSection/InfoSection";
import Buttons from "../components/EditColors/Buttons/Buttons";

import { useAsyncRequest } from "../hooks/useRequest.hook";
import { getColors } from "../api/api";
import { Color } from "../types";





const EditColors = () => {
    const [colors, setColors] = useState<Color[]>([])
    const [darkTheme, setDarkTheme] = useState(false)
    const {data, loading, error} = useAsyncRequest(({
        requestFunction: getColors
    }))


    useEffect(() => {
        if (data) {
            setColors(data)
        }
    }, [data, loading])


    if (error) {
        return <InfoSection type='error' message="Ошибка сервера. 500" />
    }

    if (loading) {
        return <Loader />
    }

    return (
        <div className='page page--editColors'>
            <Title text='Выберите цвет' />
            
            <div className="editColorsContainer">
                <ViewPort colors={colors} darkTheme={darkTheme} />

                <div className="colorsContainer">
                    <Colors colors={colors} setColors={setColors} darkTheme={darkTheme} />
                    <Buttons colors={colors} setColors={setColors} darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
                </div>
                
            </div>
        </div>
    )
}

export default EditColors;
