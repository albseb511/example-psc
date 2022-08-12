
// Store
// 1. holds state
// 2. read the state
// 3. dispatch (action) => update your state
// 4. informs you when state is update
// const action = { type: "INCREMENT_AMOUNT" };
// const currentState = {count: 1}

const func = (currentState, action) => {
    // user / app logic
    if(action.type === "INCREMENT_AMOUNT"){
        return {
            ...currentState,
            count: currentState.count + 1
        }
    }
    else if(action.type === "DECREMENT_AMOUNT"){
        return {
            ...currentState,
            count: currentState.count - 1
        }
    }
    else{
        return currentState
    }
}

class Store {
    #state; // private
    #updater // updater fn
    #listenerCallback // 
    constructor(initState, updaterFn){
        this.#state = initState;
        this.#updater = updaterFn;
    } 
    getState(){
        return this.#state
    }
    get state(){
        return this.#state
    }
    dispatch(action){
        // you get a new state
        const currentState = this.#state
        const newState = this.#updater( currentState, action );
        this.#state = newState;
        if( currentState === newState ){
            // state has not changed
            return
        }
        else{
            // state has changed
            if( this.#listenerCallback )
                this.#listenerCallback()
        }
    }
    subscribe(callback){
        this.#listenerCallback = callback
    }
    selectState( selector ){
        return selector( this.#state )
    }
}

const store = new Store( { count: 1 }, func );
const callback =()=>{
    console.log(`store has got updated`)
    console.log(store.state)
}
store.subscribe( callback )

console.log(store.state)

store.dispatch( { type: "INCREMENT_AMOUNT" } )
store.dispatch( { type: "INCREMENT_AMOUNT" } )
store.dispatch( { type: "DECREMENT_AMOUNT" } )

let count = store.selectState( state => state.count );

console.log(count)

// create a class store
// create a private state field
// create a getState, and getter func