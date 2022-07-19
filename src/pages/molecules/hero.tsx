import gsap from "gsap";
import React, { useEffect } from "react";
import { connect } from "react-redux"
import { RootState } from '../../store';

type Props = {
    title: string
}
const Hero = ({ title }: Props) => {
    let ref1 = React.useRef(null);
    let ref2 = React.useRef(null);
    useEffect(() => {
        window.addEventListener('mousemove', (e) => {
            let x = (50 - (((e.clientX) / window.innerWidth) * 100));
            let y = (50 - (((e.clientY) / window.innerHeight) * 100));
            let blur = 0.7 + (window.innerWidth - e.clientX) / (window.innerWidth * 2);
            let blur2 = 0.7 + (e.clientX) / (window.innerWidth * 2);
            gsap.to(ref1.current, { x: -x + '%', y: y, scale: blur })
            gsap.to(ref2.current, { x: x + '%', y: -y, scale: blur2 })
        })
    }, [])
    return (
        <div className="hero container">
            <div ref={ref1} className="hero__blur"></div>
            <div ref={ref2} className="hero__blur"></div>
            <div className="hero__text">
                <h1>{title}</h1>
            </div>
            <div className="hero__btn">
                <button>Get in Touch</button>
            </div>
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    reducer: state.reducer
})
export default connect(mapStateToProps)(Hero)