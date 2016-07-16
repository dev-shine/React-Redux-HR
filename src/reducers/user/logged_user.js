import Immutable from 'immutable'

let initialState = {
    logged_in : 0,
    userid : '-1',
    username : '-1',
    role : '-1',
    name : '-1',
    jobtitle : '-1'
}

export function logged_user( state = Immutable.Map(initialState), action ){

    if( action.type == 'ACTION_LOGIN_SUCCESS' ){

        return state.set( 'logged_in' , 1 )
        .set( 'userid' , action.payload.id )
        .set( 'username' , action.payload.username )
        .set( 'role' , action.payload.role )
        .set( 'name' , action.payload.name )
        .set( 'jobtitle', action.payload.jobtitle )
        
    }else if( action.type == 'ACTION_LOGIN_FAIL' ){

        return state.set( 'logged_in' , -1 )

    }else if( action.type == 'ACTION_LOGIN_ERROR' ){

        return state.set( 'logged_in' , -1 )

    }else if( action.type == 'ACTION_LOGOUT'){
        return state.set( 'logged_in' , 0 )
        .set( 'userid' , '-1')
        .set( 'username' , '-1' )
        .set( 'role' , '-1' )
        .set( 'name' , '-1' )
        .set( 'jobtitle', '-1' )
    }else{
        return state
    }
}