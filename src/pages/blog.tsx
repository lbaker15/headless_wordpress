import { connect } from "react-redux"
import { RootState } from '../store';

type Props = {
    posts: object[]
}
const DashboardTemp = ({ posts }: Props) => {
    console.log(posts)
    return (
        <div className="post">
            <h1>Blog</h1>
            <div className="post-list">
                {posts.map((item: any, i) => {
                    let p = (item.excerpt) ? item.excerpt.rendered.replace('<p>', '').replace('</p>', '') : '';
                    let d = (item.date) ? new Date(item.date).toLocaleDateString() : ''
                    return (
                        <div key={'post' + i} className="post-item">
                            <div className="post__left">
                                {item.jetpack_featured_media_url &&
                                    <img src={item.jetpack_featured_media_url} />
                                }
                            </div>
                            <div className="post__right">
                                <h2><a href={item.link}>{(item.title) ? item.title.rendered : ''}</a></h2>
                                <h3>{d}</h3>
                                <p>{p}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    reducer: state.reducer
})
export default connect(mapStateToProps)(DashboardTemp)