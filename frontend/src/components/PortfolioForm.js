import axios from "axios"
import React, { useEffect, useState } from 'react'

export function PortfolioForm() {

    const [symbol, setSymbol] = useState('')
    const [stockChartXValues, setStockChartXValues] = useState([])
    const [stockChartYValues, setStockChartYValues] = useState([])
    const [loading, setLoading]= useState(true)

    const handleSubmit = async() =>{
        const apikey= "M7DSRJECMBCEEWGF"
        const ticker = symbol

        try{
            axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${apikey}`)
            .then(res =>{
                const returnData = JSON.stringify(res)

                if(res.ok){
                    const data = res.data
                    console.log(data)
                    setLoading(false)
                }
                console.log(res.data)
                const data = res.data
                console.log(data)

                for( var key in data['Time Series (Daily)']) {
                    setStockChartXValues(key)
                    setStockChartYValues(data[`Time Series (Daily)`]
                    [key]['1. open'])
                    console.log("this is it: " + stockChartXValues)
                    console.log("this is that: " + stockChartYValues)
                }
            }).catch(e =>{
                console.error(e)
            })
        }catch(error){
            console.log(error)
        }
        }



        return (
            <div className="login-container">
                <h1>Stock portfolio</h1>
                <form onSubmit={handleSubmit} className="login-content">
                    <label>Symbol</label>
                            <input 
                                type="text" 
                                name="stockSymbol"
                                placeholder="TSLA...." 
                                onChange={(e) => setSymbol(e.target.value)}
                                required
                            />
    
                    <button className="login-loginButton">Fetch</button>
                </form>
                <ul className="login-container">
                    <li>
                        <p>Ticker, price, date, etc</p>
                        {!loading ? (
                            <div>Loading...</div>
                        ) : (
                            <div>
                                <h1>Date: {stockChartXValues}</h1>
                                <p>Price: {stockChartYValues}</p>
                                <ul>
                                {stockChartXValues.map(item =>{
                                            <li key={item.id}>{item.value}</li>
                                        })}
                                </ul>
                            </div>
                        )}
                    </li>
                </ul>
            </div>
        )
    }
    
    export default PortfolioForm
