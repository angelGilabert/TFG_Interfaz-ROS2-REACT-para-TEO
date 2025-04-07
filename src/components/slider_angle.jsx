import Slider from "rc-slider";
import './slider_angle.css'
import "rc-slider/assets/index.css";


export function Slider_angle({ name, number_joint, angles, setAngles, max_angle, min_angle, setChangingValue, isDisabled = false }) {

    const handleChangeAngle = (value) => {
        setChangingValue(true)
        const aux_list = [...angles]
        aux_list[number_joint] = value
        setAngles(aux_list)
    }


    return (
        <section className="slider_section">

            <div id='name_comp'>
                <p> {name} </p>

            </div>

            <div id='slider_cont'>
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
                <span id='span_value'> {(angles[number_joint] * 180 / Math.PI).toFixed(2)}° </span>

            </div>
        </section >
    )
}