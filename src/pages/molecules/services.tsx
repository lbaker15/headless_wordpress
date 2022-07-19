import { connect } from "react-redux"
import { RootState } from '../../store';

type Props = {
    services: Service[]
}
type Service = {
    title: string, content: string
}
const Services = ({ services }: Props) => {
    return (
        <div className="services container">
            <h1>Services I offer</h1>
            <div className="services__grid">
                {services.length &&
                    services.map((item: Service) => {
                        return (
                            <div className="services__item">
                                <div>{item.title}</div>
                                <div>{item.content}</div>
                            </div>
                        )
                    })
                }


            </div>
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    reducer: state.reducer
})
export default connect(mapStateToProps)(Services)