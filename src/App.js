import { useEffect, useState } from "react";
import './app.css';


const App = () => {
    const [data, setData] = useState([]);
    const [input, setInput] = useState('');
    const [search, setSearch] = useState('man');
    const [load, setLoad] = useState(true);

    const pixaData = `https://pixabay.com/api/?key=34354439-e2d66846314cd63eaa92b43df&q=${search}&image_type=photo&page=2&per_page=200&lang=ko`;
    const getData = async () => {
        setLoad(true);
        const r = await fetch(pixaData).then(it => it.json());
        setData(r.hits);
        setLoad(false);
    }
    useEffect(() => { getData() }, [search]);

    const onSubmit = e => {
        e.preventDefault();
        // if (input.length < 3) {
        //     alert('더 입력하세요')
        //     return
        // }
        setSearch(input);
    }
    const onChange = e => setInput(e.target.value);

    console.log(data);

    if (load) {
        return <div className="load"><i class="xi-spinner-5 xi-spin"></i></div>
    }
    return (
        <div className="app">
            <form onSubmit={onSubmit}>
                <input type="text" onChange={onChange} />
                <button><i className="xi-search"></i></button>
            </form>
            <ul className="list">
                {
                    data.map(it => {
                        return (
                            <li key={it.id}>
                                <figure>
                                    <img src={it.largeImageURL} alt="" />
                                </figure>
                                <strong>{it.tags}</strong>
                            </li>
                        )
                    })
                }
            </ul>
        </div>


    )




}

export default App;