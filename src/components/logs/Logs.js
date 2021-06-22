import React, { useEffect } from 'react'
import { connect }  from 'react-redux';
import LogItem from './LogItem'
import Preloader from '../layout/Preloader'
import PropTypes from 'prop-types'
import { getLogs } from '../../actions/logActions'

//app level state
const Logs = ({ log: {logs, loading}, getLogs }) => {
    
    useEffect(() => {
        getLogs();
        //eslint-disable-next-line
    }, [])

    if(loading || logs === null ) {
        return <Preloader />;
    }

    return (
        <ul className= "collection with-header">
            <li className= "collection-header">
                <h4 className= "center">System Logs</h4>
            </li>

            {!loading && logs.length === 0 ? (<p className= "center"> No logs to show... </p> ) : (
                logs.map(log => <LogItem log= {log} key= {log.id} />)
            )}
        </ul>
    )
}

Logs.propTypes= {
    log: PropTypes.object.isRequired,
    getLogs: PropTypes.func.isRequired
}

// Map anything in app level state to a local prop
const mapStateToProps = state => ({
    log: state.log
})


export default connect(
    mapStateToProps, 
    {getLogs}
    )(Logs)


//Using Redux in a component

//1)import connect
//2)export connect at end
//3)map state to props. bring in all or some state
// 4) if action, import it at top & Add it as a second parameter for map state to props.
//5. Action & state are both props. You can destruc at top so no need to use props.___