import Slider from "rc-slider";
import './slider_angle.css'
import "rc-slider/assets/index.css";
import { CustomeInput } from "./custome_input";


export function Slider_angle({ name, number_joint, angles, setAngles, max_angle, min_angle, setChangingValue = null, isDisabled = false, isMeter = false }) {

    const handleChangeAngle = (value) => {
        if (setChangingValue) {
            setChangingValue(true)
        }
        const aux_list = [...angles]
        aux_list[number_joint] = value
        setAngles(aux_list)
    }

    const handleChangeAngle_2 = (value) => {
        const valor = value * Math.PI / 180
        const aux_list = [...angles]
        aux_list[number_joint] = valor
        setAngles(aux_list)
    }

    // ! Hacer que el ancho y el margen sean tambien props


    return (
        <section className="slider_section">

            <div id='name_comp'>
                <p> {name} </p>

            </div>

            <div id='slider_cont'>

                {isMeter ? (
                    <>
                        <Slider
                            type={'range'}
                            min={min_angle}
                            max={max_angle}
                            step={0.001}
                            marks={{
                                0: "0",
                                [`${min_angle}`]: min_angle,
                                [`${max_angle}`]: max_angle
                            }}
                            onChange={handleChangeAngle}
                            onChangeComplete={() => setChangingValue(false)}
                            included={false}
                            value={angles[number_joint]}
                            disabled={isDisabled}
                        />
                        <span style={{
                            width: 'auto', height: 'auto', fontSize: '18px', fontWeight: '500', marginTop: '7px', fontFamily: "'Roboto', sans-serif", marginRight: '75px', color: 'black'
                        }} className='span_value'> {angles[number_joint].toFixed(2)}m </span>
                    </>
                ) : (
                    <>
                        <Slider
                            type={'range'}
                            min={min_angle * Math.PI / 180}
                            max={max_angle * Math.PI / 180}
                            step={0.001}
                            marks={{
                                0: "0",
                                [`${min_angle * Math.PI / 180}`]: min_angle,
                                [`${max_angle * Math.PI / 180}`]: max_angle
                            }}
                            onChange={handleChangeAngle}
                            onChangeComplete={() => setChangingValue(false)}
                            included={false}
                            value={angles[number_joint]}
                            disabled={isDisabled}
                        />
                        <CustomeInput value={(angles[number_joint] * 180 / Math.PI).toFixed(2)} setValue={handleChangeAngle_2} minimo={min_angle} maximo={max_angle} />
                    </>
                )}
            </div>
        </section >
    )
}