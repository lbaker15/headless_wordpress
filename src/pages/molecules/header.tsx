import gsap from "gsap";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux"
import { Link } from "react-router-dom";
import { RootState } from '../../store';

type Props = {

}
const Header = ({ }: Props) => {
    const [open, setOpen] = useState(false)
    const ref = React.useRef(null)
    const burger1 = React.useRef(null)
    const burger2 = React.useRef(null)
    const burger3 = React.useRef(null)
    const handleClick = () => {
        let newOpen = !open;
        setOpen(newOpen)
    }
    useEffect(() => {
        let tl = gsap.timeline()
        tl.fromTo(burger1.current, { background: 'white' }, { background: 'black' })
        tl.fromTo(burger2.current, { background: 'white' }, { background: 'black' }, '=>')
        tl.fromTo(burger3.current, { background: 'white' }, { background: 'black' }, '=>')
        tl.fromTo(burger1.current, { opacity: 1 }, { opacity: 0 }, '=>')
        tl.fromTo(burger2.current, { rotate: 0 }, { rotate: 45 }, '=>')
        tl.fromTo(burger3.current, { rotate: 0, x: 0, y: 0 }, { x: -3, y: -12, rotate: -45 }, '=>')
        if (open) {

            tl.restart()
            gsap.to(ref.current, { x: 0, duration: 0.4 })
        } else {
            tl.reverse()
            gsap.to(ref.current, { x: '-100%', duration: 0.4 })
        }
    }, [open])
    return (
        <div className="header">
            <div

                onClick={handleClick}
                className="header__burger">
                <div ref={burger1}  ></div>
                <div ref={burger2}  ></div>
                <div ref={burger3}  ></div>
            </div>
            <div ref={ref} className="header__menu">
                <div className="menu">
                    <div className="menu__left">

                    </div>
                    <div className="menu__right">
                        <div className="menu__item"><Link to={"/"}><span>About</span></Link></div>
                        <div className="menu__item"><Link to={"/blog"}><span>Blog</span></Link></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    reducer: state.reducer
})
export default connect(mapStateToProps)(Header)