import { Teo_model } from '../3d_model.jsx';
// import { ImageCanvasComponent } from './VideoComponent.jsx';
import { useNavigate } from 'react-router-dom';


export function Home_screen() {
    const navigate = useNavigate();

    const handleClick = (page) => {
        if (page == 1) {
            navigate("/Images");
        } else {
            navigate("/Force");
        }
    };


    return (
        <main>
            <div className='cont_3dmodel'>
                <Teo_model />
            </div>

            <div className='div_iconos'>
                <div class="item" onClick={() => handleClick(1)}>1</div>
                <div class="item" onClick={() => handleClick(2)}>2</div>
                <div class="item">3</div>
                <div class="item">4</div>
                <div class="item">5</div>
                <div class="item">6</div>
            </div>
        </main>

    )
}


export function Images() {
    return (
        <main>
            <div>
                <ImageCanvasComponent />
            </div>
        </main>
    )
}