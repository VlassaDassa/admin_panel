import { useEffect, useState } from "react";

import ViewPort from "../components/EditColors/ViewPort/ViewPort";
import ThemeChange from "../components/EditColors/ThemeChange/ThemeChange";
import Title from "../components/general/Title/Title";
import Colors from "../components/EditColors/Colors/Colors";
import Loader from "../components/general/Loader/Loader";
import InfoSection from "../components/general/InfoSection/InfoSection";

import { useAsyncRequest } from "../hooks/useRequest.hook";
import { getColors } from "../api/api";
import { Color } from "../types";






const EditColors = () => {
    const [colors, setColors] = useState<Color[]>([])
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
                <ViewPort colors={colors} />

                <div className="colorsContainer">
                    <Colors colors={colors} setColors={setColors} />
                    <ThemeChange />
                </div>
                
            </div>
        </div>
    )
}

export default EditColors;
