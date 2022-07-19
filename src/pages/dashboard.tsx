import { connect, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { addData, getData } from '../actions/index';
import { useEffect, useState } from 'react';
import { RootState } from '../store';
import Services from './molecules/services';
import Contact from './molecules/contact';
import Hero from './molecules/hero';
import Header from './molecules/header';

type Props = {
    reducer: { items: object[] }
}
const Dashboard = ({ reducer }: Props) => {
    let dispatch = useDispatch();
    let [services, setServices] = useState<any>([])
    let [title, setTitle] = useState<string>('')
    const [slugs, setSlugs] = useState<any>([])
    const [slugData, setSlugData] = useState<any>([])
    useEffect(() => {
        let s: any = []
        let url = 'http://18.170.155.126/wp-json/wp/v2/pages'
        fetch(url)
            .then(res => res.json())
            .then(data => {
                let home = data.filter((item: any) => item.title.rendered === 'Home Page');
                let title: string = String(Object.entries(home[0].acf).filter((item: any) => item[0] === 'title').flat()[1]);
                Object.entries(home[0].acf).map((item: any, i: number) => {
                    if (String(item[0]).includes('item')) {
                        if (item[1]) {
                            let slug = (item[1].split('http://18.170.155.126/'))[1]
                            s.push(slug)
                        }
                    }
                    if (i === Object.entries(home[0].acf).length - 1) {
                        setSlugs(s)
                    }
                })
                setTitle(title)
            })

    }, [])
    useEffect(() => {
        slugs.map((slug: any, i: any) => {
            fetch(`http://18.170.155.126/wp-json/wp/v2/pages?slug=${slug}`)
                .then(res => res.json())
                .then(async (data) => {
                    let newData = slugData.concat(data)
                    setSlugData(newData)
                })
        })
    }, [slugs])
    useEffect(() => {
        if (services.length < slugs.length) {
            slugData.map(async (data: any, i: any) => {
                console.log(data)
                const func = (str: string) => {
                    let newStr = str.replace('\n', '').replace('<p>', '').replace('</p>', '')
                    if (newStr.includes('\n')) {
                        func(newStr)
                    } else {
                        let obj = { title: data.title.rendered, content: newStr }
                        let newServ = services.concat(obj)
                        if (services.length < slugs.length) {
                            setServices(newServ)
                        }
                    }
                }
                func(String(data.content.rendered))
            })
        }
    }, [slugData])
    console.log(services)
    return (
        <div>
            <Hero title={title} />
            <Services services={services} />
            <Contact />
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    reducer: state.reducer
})

export default connect(mapStateToProps)(Dashboard)