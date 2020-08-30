import React, { useEffect, useState } from 'react'

// REDUX

import { connect } from 'react-redux'
import { fetchHacks,fetchAllHacks } from '../../actions/dashboard-hacks'

// COMPONENTS
import MyHacksCard from './MyHacksCard'
import {
    Spinner,
} from 'reactstrap'
import axiosWithAuth from '../../utils/axiosWithAuth'

const MyHacks = (props) => {

    const currentUsername = localStorage.getItem('username')
    const [userid, setUserId] = useState()

    useEffect(() => {
        axiosWithAuth()
            .get(`/howTo/users`)
            .then( res => {
                res.data.map(user => {
                    if(user.username === currentUsername) {
                        localStorage.setItem('userid', user.id)
                        setUserId(localStorage.getItem('userid'))
                    }
                })
            })
            .catch ( err => {
                console.error(err.message)
            })
    }, [])
    return(
        <div className="dashboard-myhacks">

            <h3>Welcome Back, {localStorage.getItem('username')}</h3>
            <hr/>
            <h2>My Hacks</h2>
            {props.fetchAllHacks()}
            {props.isFetching ? (
                <div className="cards">
                
                {props.hacks.map (hack => {
                    return(
                        
                        <MyHacksCard
                            key={hack.userId} //change by romeo
                            title={hack.title}
                            body={hack.description}
                            stepone={hack.stepOneDescription}
                            steptwo={hack.stepTwoDescription}
                            stepthree={hack.stepThreeDescription}
                            userId={hack.id}
                        />)})}
                </div>
            ):(
                <div className="fetchng">
                    <Spinner style={{width: '3rem', height: '3rem'}} type="grow"/>
                    {props.fetchHacks(localStorage.getItem('userid'))}
                </div>
            ) : (
                <div className="cards">
                    {props.hacks.map ( hack => {
                        if(hack.userID == userid ){
                            return(
                                <MyHacksCard
                                    key={hack.userID}
                                    userID={hack.userID}
                                    title={hack.title}
                                    description={hack.description}
                                    firstName={hack.firstName}
                                    lastName={hack.lastName}
                                />
                            )
                        } 
                    })}
                </div>
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isFetching: state.hacksReducer.isFetching,
        hacks: state.hacksReducer.hacks,
        error: state.hacksReducer.error
    }
}

export default connect(
    mapStateToProps,
    { fetchHacks,fetchAllHacks }
)(MyHacks)